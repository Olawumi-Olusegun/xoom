"use client";


import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname();

  return (
    <section className='sticky left-0 top-0 flex min-h-screen w-fit flex-col justify-between bg-dark-1 p-3 pt-28 text-white max-sm:hidden lg:w-[264px] '>
        <div className="flex flex-1 flex-col gap-3 ">
            {
            sidebarLinks.map((link) => {
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                return (
                    <Link 
                    key={link.label} 
                    href={link.route} 
                    className={cn("flex gap-4 items-center p-3 rounded-lg justify-start", {
                        "bg-blue-1": isActive
                    })
                    } 
                    >
                        <Image 
                        src={link.imageUrls} 
                        alt={link.label} 
                        width={20}
                        height={20}
                        className={cn("")}
                        />
                        <p className='text-lg font-medium max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            })  
            }
        </div>
    </section>
  )
}

export default Sidebar