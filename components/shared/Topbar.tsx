import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Topbar() {
    return (
        <nav className='topbar'>
            <Link href="/" className='flex items-center gap-4'>

                <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Next-Threads</p>

            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden"> {/* md:hidden will hide this component unless the device is mobile*/}
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt='logout' width={24} height={24}/>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                {/* Adds a drop down that allows user to create their own organization or workspace */}
                <OrganizationSwitcher appearance={{
                    elements:{
                        organizationSwitcherTrigger:"py-2 px-4"
                    }
                }}/>
            </div>
        </nav>
    )
}
