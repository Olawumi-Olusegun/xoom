
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { type PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: "xoom",
  description: "Video calling app",
  icons: "/icons/logo.svg"
};

const RootLayout = ({children}: PropsWithChildren) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout