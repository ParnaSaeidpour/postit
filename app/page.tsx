'use Client'

import axios from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'


//Fetch all post

const allPosts= async()=>{
  const response=await axios.get('/api/posts/getPosts')
  return response.data
}


export default function Home() {
  
  
  return (
    <main >
      
      <AddPost/>  
    </main>
  )
}
