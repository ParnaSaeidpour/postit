export type PostUser = {
  id: string
  name: string | null
  image: string | null
}

export type PostType = {
  id: string
  title: string
  createdAt: string
  user: PostUser
}
