import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import { userInfo } from 'os';
import React from 'react'

export default async function Page() {
    const user = await currentUser(); //Checking for logged in user
    if(!user) return null;
    const userInfo = await fetchUser(user.id);
    console.log(userInfo)
    if(!userInfo?.onBoard) redirect('/onboarding'); //if onboarded isnt completed then user is redirected
  return (
    <>
   <h1 className="head-text">Create Thread</h1>
    <PostThread userId = {userInfo._id}/>
    </>
  )
}
