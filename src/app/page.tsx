// import prisma from '@/lib/prisma'
import { getUserByClerkId } from '@/actions/user.action';
import CreatePost from '@/components/CreatePost';
import Feed from '@/components/Feed';
import { Button } from '@/components/ui/button';
import WhoToFollow from '@/components/WhoToFollow';
import { SignInButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'

const page = async() => {

  const authUser = await currentUser();

  if(!authUser){
    return (
      <div className='flex justify-center flex-col gap-5 items-center h-screen'>
        <p className='text-[var(--text-color)] text-3xl font-bold'>Please Login to use this app</p>
        <SignInButton>
          <Button className='bg-[var(--btn-color)] text-[var(--bg-color)] hover:bg-[var(--btn-hover)] cursor-pointer'>Sign In </Button>
        </SignInButton>
      </div>
    )
  }

  const user = await getUserByClerkId(authUser.id);

  
  

  return (
    <>
    <div>
      {user ? <CreatePost/> : "Login to post"}
    </div>
    <div>
      <Feed/>
    </div>
    
    </> 
  )
}

export default page