import { getUserById } from '@/actions/user.action';
import Followers from '@/app/Followers';
import Followings from '@/app/Followings';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';


const page = async({ params }: { params: Promise<{ userId: string }> }) => {
        const resolvedParams = await params;
        const user = await getUserById(resolvedParams.userId)
        
        
  return (
    <div>
      <div>
        <p className='text-[var(--text-color)] text-xl font-semibold text-center my-3'>
          <Link href={`/profile/${user?.username}`}>
        {user?.username}
          </Link>
        </p>
      </div>
      <Tabs defaultValue="followers" className="w-full">
  <TabsList className='w-full bg-[var(--primary-color)] text-[var(--text-color)]'>
    <TabsTrigger value="followers" className='cursor-pointer data-[state=active]:bg-[var(--btn-color)] text-[var(--text-color)] data-[state=active]:text-[var(--bg-color)]'>
       <p className='text-center text-xl font-semibold '>Followers</p>
    </TabsTrigger>
    <TabsTrigger className='cursor-pointer data-[state=active]:bg-[var(--btn-color)] text-[var(--text-color)] data-[state=active]:text-[var(--bg-color)]' value="followings">
      <p className='text-center  text-xl font-semibold'>Followings</p>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="followers">
    <Followers userId={resolvedParams.userId}/>
  </TabsContent>
  <TabsContent value="followings">
    <Followings userId={resolvedParams.userId}/>
  </TabsContent>
</Tabs>
    </div>
  )
}

export default page