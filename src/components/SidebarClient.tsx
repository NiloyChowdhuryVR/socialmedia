"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'

export type SidebarUser = {
  id: string;
  email: string;
  username: string;
  clerkId: string;
  name: string | null;
  bio: string | null;
  image: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
};

const SidebarClient = ({user}:{user:SidebarUser}) => {

    const {user:currentUser ,isLoaded} = useUser();

    if(!isLoaded) return (
        <div>
            <Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-[70px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-full h-[20px] rounded-full my-2" />
        </div>
    )

  return (
    <div className='w-[95%] mx-auto bg-[var(--primary-color)] rounded-xl justify-center flex flex-col items-center mb-5'>
          {/* THIS IS THE BACKGROUND IMAGE SECTION */}
          <div className='h-[80px] bg-[var(--btn-color)] rounded-t-xl w-full overflow-hidden'>
            <Image src={`/default-background.jpg`} alt='Background' width={250} height={80}/>
          </div>
{/* THIS IS THE USER INFO SECTION (IMAGE, FOLLOWER, FOLLOWING) */}
          <div className='flex flex-row justify-center items-center gap-3 text-sm py-2'>
            <div className='text-center'>
              <h2 className='font-bold text-[var(--text-color)] '>{user?._count.followers}</h2>
              <p className='text-[var(--secondary-text)] font-bold'>Followers</p>
            </div>
            <div className=''>
              <Link href={`/profile/${user?.username}`}>
              <Image src={user?.image ?? `/default-avatar.png`} alt='Avatar' width={50} height={50} className='rounded-[50%]'/>
              </Link>
            </div>
            <div className='text-center'>
              <h2 className='font-bold text-[var(--text-color)] '>{user?._count.following}</h2>
              <p className='text-[var(--secondary-text)] font-bold'>Following</p>
            </div>
          </div>
{/* THIS IS NAME USERNAME BIO SECTION  */}
          <div className='pt-2 pb-5'>
            <div className='text-center'>
            <h1 className='text-[var(--text-color)] font-bold'>
              <Link href={`/profile/${user?.username}`}>
              {user?.name}
              </Link>
              </h1>

            <p className='text-xs text-[var(--secondary-text)]'>
              <Link href={`/profile/${user?.username}`}>
              {`@${user?.username}`}
              </Link>
              </p>
            <div className='pt-2'>
              <p className='text-[var(--text-color)] text-xs'>{user?.bio || "This user has no set bio!"} </p>
            </div>
            <div className='pt-5'>
              <Link href={`/profile/${user?.username}`}>
              <Button size={'sm'} className='bg-[var(--btn-color)] text-[var(--bg-color)]  w-full hover:bg-[var(--btn-hover)] cursor-pointer'>Visit Profile</Button>
              </Link>
            </div>
            </div>
          </div>
        </div>

  )
}

export default SidebarClient