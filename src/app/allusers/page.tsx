import { getAllUsers } from '@/actions/user.action'
import FollowButton from '@/components/FollowButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async() => {

    const allUsers = await getAllUsers();

  return (
    <div>
        {allUsers?.map((user)=>(
            <div key={user.id} className='bg-[var(--bg-color)] rounded-xl p-2 my-3'>
              <div className='flex gap-3 items-center'>

              <div>
                <Link href={`/profile/${user.username}`}>
                <Image src={user.image??'/default-avatar.png'} alt='Avatar' height={30} width={30} className='rounded-md'/>
                </Link>
              </div>
              <div>
            <Link  href={`/profile/${user.username}`}>
                <p className='text-[var(--text-color)] text-xs'>{user.name}</p>
            </Link>
            <Link  href={`/profile/${user.username}`}>
                <p className='text-[var(--secondary-text)] text-xs'>@{user.username}</p>
            </Link>
              </div>
                <div className='mt-2'>
                <FollowButton userId={user.id}/>
                </div>
              </div>
            </div>
        ))}
    </div>
  )
}

export default page