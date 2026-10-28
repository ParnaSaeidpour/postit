import { beforeEach, describe, expect, it, vi } from "vitest"
import type { NextApiRequest, NextApiResponse } from "next"

// Prisma and NextAuth are replaced with fakes: no database or Google login needed
const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  prisma: {
    user: { findUnique: vi.fn() },
    post: { create: vi.fn(), findMany: vi.fn() },
  },
}))

vi.mock("next-auth/next", () => ({ getServerSession: mocks.getServerSession }))
vi.mock("../pages/api/auth/[...nextauth]", () => ({ authOptions: {} }))
vi.mock("../prisma/client", () => ({ default: mocks.prisma }))

import addPosts from "../pages/api/posts/addPosts"
import getPosts from "../pages/api/posts/getPosts"
import authPosts from "../pages/api/posts/authPosts"

const call = async (handler: Function, method: string, body?: unknown) => {
  const res = {
    statusCode: 200,
    body: undefined as any,
    headers: {} as Record<string, string>,
    status(code: number) { this.statusCode = code; return this },
    json(data: unknown) { this.body = data; return this },
    setHeader(name: string, value: string) { this.headers[name] = value; return this },
  }
  await handler({ method, body } as NextApiRequest, res as unknown as NextApiResponse)
  return res
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.getServerSession.mockResolvedValue({ user: { email: "parna@example.com", name: "Parna" } })
  mocks.prisma.user.findUnique.mockResolvedValue({ id: "user_1", email: "parna@example.com" })
  mocks.prisma.post.create.mockImplementation(async ({ data }) => ({ id: "post_1", ...data }))
})

describe("POST /api/posts/addPosts", () => {
  it("creates a post for the logged-in user", async () => {
    const res = await call(addPosts, "POST", { title: "  My first post  " })
    expect(res.statusCode).toBe(200)
    expect(mocks.prisma.post.create).toHaveBeenCalledWith({ data: { title: "My first post", userId: "user_1" } })
  })

  it("requires sign-in", async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const res = await call(addPosts, "POST", { title: "Hi" })
    expect(res.statusCode).toBe(401)
    expect(mocks.prisma.post.create).not.toHaveBeenCalled()
  })

  it.each([{}, { title: "" }, { title: "a".repeat(301) }])("rejects invalid text %#", async (body) => {
    const res = await call(addPosts, "POST", body)
    expect(res.statusCode).toBe(400)
    expect(mocks.prisma.post.create).not.toHaveBeenCalled()
  })

  it("only accepts POST", async () => {
    const res = await call(addPosts, "GET")
    expect(res.statusCode).toBe(405)
  })
})

describe("GET /api/posts/getPosts", () => {
  it("returns posts newest first without users' email addresses", async () => {
    mocks.prisma.post.findMany.mockResolvedValue([{ id: "post_1", title: "Hi", user: { id: "user_1", name: "Parna", image: null } }])
    const res = await call(getPosts, "GET")

    expect(res.statusCode).toBe(200)
    const query = mocks.prisma.post.findMany.mock.calls[0][0]
    expect(query.orderBy).toEqual({ createdAt: "desc" })
    expect(query.include.user.select).toEqual({ id: true, name: true, image: true })
  })

  it("returns 500 when the database fails", async () => {
    mocks.prisma.post.findMany.mockRejectedValue(new Error("db down"))
    const res = await call(getPosts, "GET")
    expect(res.statusCode).toBe(500)
  })
})

describe("GET /api/posts/authPosts", () => {
  it("returns only the logged-in user's posts", async () => {
    mocks.prisma.user.findUnique.mockResolvedValue({ id: "user_1", name: "Parna", image: null, Post: [] })
    const res = await call(authPosts, "GET")

    expect(res.statusCode).toBe(200)
    expect(mocks.prisma.user.findUnique.mock.calls[0][0].where).toEqual({ email: "parna@example.com" })
  })

  it("requires sign-in", async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const res = await call(authPosts, "GET")
    expect(res.statusCode).toBe(401)
  })
})
