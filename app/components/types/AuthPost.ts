export type AuthPosts = {
  id: string
  name: string | null
  image: string | null
  Post: {
    id: string
    title: string
    createdAt: string
  }[]
}
