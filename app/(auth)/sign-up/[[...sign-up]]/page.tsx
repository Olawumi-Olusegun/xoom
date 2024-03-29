
import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex min-h-screen w-full items-center justify-center '>
        <SignUp />
    </main>
  )
}

export default SignUpPage