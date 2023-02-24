'use client'


import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../components/types/AuthPost"

const fetchAuthPosts= async()=>{
    const response=await axios.get('/api/posts/authPosts')
    return response.data
}


export default function MyPosts(){
    const {data, isLoading}=useQuery<AuthPosts>({queryFn: fetchAuthPosts, queryKey:['auth-posts']})
    if(isLoading) return <h1>
        Posts are Loading....
    </h1>
    return(
        <div>
            <h1>Data</h1>
        </div>
    )
}