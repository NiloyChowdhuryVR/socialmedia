import { getUserByClerkId } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

const Sidebar = async() => {

  const dbUser = await currentUser();
  if(!dbUser) return(
    <div>Please Login to view</div>
  )
  

  const user = await getUserByClerkId(dbUser.id);



  return (
    <div className='sidebar w-[250px] bg-[var(--bg-color)]'>
        <div className='w-[95%] mx-auto bg-[var(--primary-color)] rounded-xl justify-center flex flex-col items-center'>
          {/* THIS IS THE BACKGROUND IMAGE SECTION */}
          <div className='h-[80px] bg-[var(--btn-color)] rounded-t-xl w-full overflow-hidden'>
            <Image src={`/default-background.jpg`} alt='Background' width={250} height={80}/>
          </div>
{/* THIS IS THE USER INFO SECTION (IMAGE, FOLLOWER, FOLLOWING) */}
          <div className='flex flex-row justify-center items-center gap-3 text-sm py-2'>
            <div className='text-center'>
              <h2 className='font-bold text-[var(--text-color)] '>{user?._count.followers}</h2>
              <p className='text-[var(--second-text)] font-bold'>Followers</p>
            </div>
            <div className=''>
              <Link href={`/profile/${user?.username}`}>
              <Image src={user?.image ?? `/default-avatar.png`} alt='Avatar' width={50} height={50} className='rounded-[50%]'/>
              </Link>
            </div>
            <div className='text-center'>
              <h2 className='font-bold text-[var(--text-color)] '>{user?._count.following}</h2>
              <p className='text-[var(--second-text)] font-bold'>Following</p>
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

            <p className='text-xs text-[var(--second-text)]'>
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
    </div>
  )
}

export default Sidebar