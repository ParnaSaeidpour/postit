import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"
import { validateTitle } from "../../../lib/posts"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email)
    return res.status(401).json({ message: 'Please sign in to make a post' })

  //Check title

  const title = req.body?.title
  const error = validateTitle(title)
  if (error) return res.status(400).json({ message: error })

  //Get user

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!prismaUser) return res.status(401).json({ message: 'Please sign in to make a post' })

  //Create Post
  try {
    const result = await prisma.post.create({
      data: {
        title: title.trim(),
        userId: prismaUser.id,
      },
    })
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: 'Error has occurred while making a post' })
  }
}
