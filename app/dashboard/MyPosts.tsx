'use client'


import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Post from "../components/Post"
import { AuthPosts } from "../components/types/AuthPost"

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}


export default function MyPosts() {
    const { data, error, isLoading } = useQuery<AuthPosts>({ queryFn: fetchAuthPosts, queryKey: ['auth-posts'] })
    if (isLoading) return <p className="my-8">Posts are loading....</p>
    if (error) return <p className="my-8 text-red-700">Your posts could not be loaded.</p>
    if (!data?.Post.length) return <p className="my-8">You have not written any posts yet.</p>
    return (
        <div>
            {data.Post.map((post) => (
                <Post key={post.id} name={data.name} avatar={data.image} postTitle={post.title} />
            ))}
        </div>
    )
}
