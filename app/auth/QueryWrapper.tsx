'use client'
import React,{ReactNode} from 'react'
import {QueryClient,QueryClientProvider} from "react-query"
import { Toaster } from 'react-hot-toast'


type Props={
    children?:ReactNode
}

// Create a client
const queryClient = new QueryClient()


const  QueryWrapper=({children}:Props)=> {
    return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
        <Toaster/>
        {children}
      </QueryClientProvider>
    )
  }

  export default QueryWrapper
  