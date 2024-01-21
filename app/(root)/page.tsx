// "use client"
import { fetchPosts } from '@/lib/actions/thread.actions'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default async function Home() {
  const result = await fetchPosts(1,30);
  console.log(result);
  return (
<>
<h1 className=''>Home</h1>
</>
  )
}
