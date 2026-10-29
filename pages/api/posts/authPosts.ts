import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { publicUserFields } from "../../../lib/posts"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email)
    return res.status(401).json({ message: 'Please sign in' })

  //Get the logged-in user's posts, newest first
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        ...publicUserFields,
        Post: {
          orderBy: {
            createdAt: 'desc'
          },
        }
      }
    })
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching your posts' })
  }
}
