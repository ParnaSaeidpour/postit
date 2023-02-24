'use Client'

import axios from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import {PostType} from "./components/types/Post"


//Fetch all post

const allPosts= async()=>{
  const response=await axios.get('/api/posts/getPosts')
  return response.data
}


export default function Home() {
  
  const{data,error,isLoading}=useQuery<PostType[]>({queryFn:allPosts , queryKey:["posts"]})
  if(error) return error
  if(isLoading) return "Loading...."
  return (
    <main >
      <AddPost/>  
      {data?.map((post)=>(
        <Post Comment={post.Comment}key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title}
        id={post.id}/>
      ))}
    </main>
  )
}
