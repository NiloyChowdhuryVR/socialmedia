// import prisma from '@/lib/prisma'
import { getUserByClerkId } from '@/actions/user.action';
import CreatePost from '@/components/CreatePost';
import Feed from '@/components/Feed';
import WhoToFollow from '@/components/WhoToFollow';
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'

const page = async() => {

  const authUser = await currentUser();

  if(!authUser){
    return <div>Please LOGINNNNNNNNNN</div>
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