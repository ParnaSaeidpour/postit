'use client'
import { useState } from "react"

export default function CreatePost(){
    const [title,setTitle]=useState("")
    return(
        <form action="clientpost">
            <div>
                <textarea onChange={(e)=>setTitle(e.target.value)}
                name="title" value={title} placeholder="what is your mind?"
                >
                    
                </textarea>
            </div>
        </form>
    )
}