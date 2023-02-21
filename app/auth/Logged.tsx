'use client'


import Image from "next/image"
import {signOut} from 'next-auth/react'
import Link from "next/link"

type User={
    image:string
}



export default function Logged({image}:User){
    return(
        <li className="flex gap-8 items-center">
              <button onClick={(()=>signOut())} type="button" className="inline-block px-6 py-2.5 bg-green-500
                 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md
                  hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg 
                  focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg 
                  transition duration-150 ease-in-out">
                    Sign out
                </button>
                <Link href={"/dashboard"}>
                    <Image width={64} height={64} src={image} alt="priority"/>
                
                </Link>
        </li>
    )
}