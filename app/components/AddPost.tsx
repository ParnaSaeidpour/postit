'use client'
import { useState } from "react"

export default function CreatePost(){
    const [title,setTitle]=useState("")
    const [isDisabled, setIsDisabled]=useState(false)
    return(
        <form action="clientpost" className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea className="p-4 rounded-md my-2
                bg-gray-200 text-lg"
                onChange={(e)=>setTitle(e.target.value)}
                name="title" value={title} placeholder="what is your mind?"
                > 
                </textarea>
            </div>
            <div className="flex items-center justify-between gap-2 ">
                <p className={`font-bold text-sm ${title.length>300 ? "text-red-700":"text-gray-700"}`}>{`${title.length}/300`}</p>
                <button 
                disabled={isDisabled}
                className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" 
                type="submit" >Create a post</button>
            </div>
        </form>
    )
}