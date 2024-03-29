
import React, { type PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const HomeLayout = ({children}: PropsWithChildren) => {
  return (
    <main className='relative'>
        <Navbar />
        <div className="flex">
            <Sidebar />
            <section className='flex flex-1 min-h-screen flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8 '>
                <div className="w-full">
                    {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout