import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

async function Page() {
   const user = await currentUser();
   const userInfo = {
      _id: "",
      userName: "",
      name: "",
      bio: "",
      image: ""
   };
   const userData = {
      id: user?.id,
      objectId: userInfo?._id,
      userName: userInfo?.userName,
      name: userInfo?.name || user?.firstName || "",
      bio: userInfo?.bio || "",
      image: userInfo?.image || user?.imageUrl

   };
   return (

      <main className="mx-auto flex max-w-31 flex-col justify-start px-10 py-20">
         <h1 className="head-text">OnBoarding</h1>
         <p className="mt-3 text-base-regular text-light-2">
            Complete your profile to use Next Threads
         </p>
         <section className="mt-9 bg-dark-2 p-10">

            <AccountProfile userData={userData} btnTitle="Continue" />     {/* Passing data to props */}
         </section>
      </main>
   )
}


export default Page;

