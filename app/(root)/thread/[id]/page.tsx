import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'



export default async function ThreadPage({ params }: { params: { id: string } }) {
    if(!params.id) return null;
    const user  = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(user.id);
    if(!userInfo.onBoard) redirect('/onboarding')
    const thread = await fetchThreadById(params.id);
    // Getting params from id
    return (

        <section className='relative'>

            <div className='text-light-2' >

                <ThreadCard
                    key={thread._id}
                    username={user?.username}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children} />

            </div>

        </section>
    )
}
