// "use client"
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions'
// import { UserButton } from '@clerk/nextjs'
import {  currentUser} from "@clerk/nextjs";
import React from 'react'

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);
  console.log(result);
  return (
    <>
      <h1 className=''>Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">
            No threads found
          </p>
        ) : (
          <>
          console.log(result.toString())
            {result.posts.map((post) => (
              // console.log(post.toString())
              <ThreadCard key={post._id} username={user?.username} id={post._id} currentUserId={user?.id||""} parentId={post.parentId} content={post.text} author={post.author} community={post.community} createdAt={post.createdAt} comments={post.children} />
            ))}
          </>
        )}
      </section>
    </>
  )
}
