'use client'

import axios from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import { PostType } from "./components/types/Post"


//Fetch all posts

const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}


export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"] })
  if (error) return <p className="my-8 text-red-700">Posts could not be loaded. Please try again.</p>
  if (isLoading) return <p className="my-8">Loading....</p>
  return (
    <main >
      <AddPost />
      {data?.map((post) => (
        <Post key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} />
      ))}
    </main>
  )
}
