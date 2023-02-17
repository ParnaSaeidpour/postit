import './globals.css'
import Nav from '@/pages/api/auth/Nav'
import { Roboto } from '@next/font/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Nav/>
        {children}
        </body>
   
    </html>
  )
}
