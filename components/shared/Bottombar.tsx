"use client"

import React from 'react'
import { sidebarLinks } from '@/constants/index'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
export default function Bottombar() {
    const pathName = usePathname(); //A hook that contains list of active routes
    return (
        <section className="bottombar  md:hidden">
            <div className="bottombar_container">
                {
                    sidebarLinks.map((link) => {
                        const isActive = (pathName.includes(link.route) && link.route.length > 1) || pathName === link.route
                        return (

                            <Link href={link.route} key={link.label} className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
                                <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                                    {link.label.split(/\s+/)[0]} {/* splits the text by space and get the first letter only */}
                                </p>
                            </Link>

                        )
                    })

                }
            </div>
        </section>
    )
}
