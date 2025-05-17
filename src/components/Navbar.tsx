import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { currentUser } from '@clerk/nextjs/server'

const Navbar = async() => {
    const user = await currentUser();
    const userName = `${user?.firstName} ${user?.lastName}`

  return (
    <div className='flex justify-center items-center bg-yellow-400'>

    <div className='flex justify-between items-center w-[90%] bg-blue-500'>
        <div>
            {userName ? userName : "Please Login"}
        </div>

        <SignedOut>
            <SignInButton>
                <Button variant="destructive">Sign In</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
    </div>
    </div>
  )
}

export default Navbar