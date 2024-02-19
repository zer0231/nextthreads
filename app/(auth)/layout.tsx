import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'

import '../globals.css'

export const metadata = {
    title: 'Next-Threads',
    description: 'A threads web app build on next-js'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayaout({
    children
}: {
    children: React.ReactNode
}

) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`bg-dark-1 place-items-center`}>
                    <div className='grid mt-8 place-items-center'>
                        <h1 className='text-sky-400 '>This is not a thread</h1>
                        <div className="mt-8">
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
