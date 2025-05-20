import { getFollowers, getFollowing } from '@/actions/follow.action';
import { getAllUsers, getDbUserId } from '@/actions/user.action'
import AllUsers from '@/components/AllUsers';
import FollowButton from '@/components/FollowButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Followers from '../Followers';
import Followings from '../Followings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const page = async() => {

    const user = await getDbUserId();
    if(!user) return null;

  return (
    <div>
      <Tabs defaultValue="followers" className="w-full">
  <TabsList className='w-full bg-[var(--primary-color)] text-[var(--text-color)]'>
    <TabsTrigger value="followers" className='cursor-pointer data-[state=active]:bg-[var(--btn-color)] text-[var(--text-color)] data-[state=active]:text-[var(--bg-color)]'>
       <p className='text-center text-xl font-semibold '>Followers</p>
    </TabsTrigger>
    <TabsTrigger className='cursor-pointer data-[state=active]:bg-[var(--btn-color)] text-[var(--text-color)] data-[state=active]:text-[var(--bg-color)]' value="followings">
      <p className='text-center  text-xl font-semibold'>Followings</p>
    </TabsTrigger>
     <TabsTrigger className='cursor-pointer data-[state=active]:bg-[var(--btn-color)] text-[var(--text-color)] data-[state=active]:text-[var(--bg-color)]' value="all">
       <p className='text-center text-xl font-semibold'>All</p>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="followers">
    <Followers userId={user}/>
  </TabsContent>
  <TabsContent value="followings">
    <Followings userId={user}/>
  </TabsContent>
    <TabsContent value="all">
    <AllUsers/>
  </TabsContent>
</Tabs>

      {/* <div className='my-3'>
      <p className='text-[var(--text-color)] text-center text-xl font-semibold'>Your Followers:</p>
      <Followers userId={user}/>
      </div>

      <hr className='border-gray-700'/>

      <div className='my-3'>
      <p className='text-[var(--text-color)] text-center  text-xl font-semibold'>Your Followers:</p>
      <Followings userId={user}/>
      </div>

      <hr className='border-gray-700'/>

      <div className='my-3'>
      <p className='text-[var(--text-color)] text-center text-xl font-semibold'>All Users:</p>
      <AllUsers/>
      </div>
      <hr className='border-gray-700'/> */}
    </div>
  )
}

export default page