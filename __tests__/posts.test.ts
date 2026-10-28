import { describe, expect, it } from "vitest"
import { MAX_TITLE_LENGTH, validateTitle } from "../lib/posts"

describe("validateTitle", () => {
  it("accepts a normal post", () => {
    expect(validateTitle("Hello Stockholm!")).toBeNull()
  })

  it("accepts exactly the maximum length", () => {
    expect(validateTitle("a".repeat(MAX_TITLE_LENGTH))).toBeNull()
  })

  it.each([undefined, null, 42, "", "   "])("rejects empty or invalid text: %s", (title) => {
    expect(validateTitle(title)).toBe("Please do not leave this empty")
  })

  it("rejects posts that are too long", () => {
    expect(validateTitle("a".repeat(MAX_TITLE_LENGTH + 1))).toBe("Please write a shorter post")
  })
})
