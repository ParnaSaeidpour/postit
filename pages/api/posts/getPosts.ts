import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../prisma/client"
import { publicUserFields } from "../../../lib/posts"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  //Fetch all posts, newest first
  try {
    const data = await prisma.post.findMany({
      include: {
        user: { select: publicUserFields },
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching posts' })
  }
}
