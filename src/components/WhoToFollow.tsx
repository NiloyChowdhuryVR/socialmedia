import { getRandomUsers } from '@/actions/user.action'
import React from 'react'
import { Button } from './ui/button';
import FollowButton from './FollowButton';
import Link from 'next/link';
import Image from 'next/image';

const WhoToFollow = async() => {

    const users = await getRandomUsers();
    if(users?.length===0) return null;

  return (
    <div className='sidebar w-[95%] bg-[var(--primary-color)] mx-auto rounded-xl p-5'>
      <p className='text-[var(--text-color)] font-semibold'>  
        Follow Them:
      </p>
        {users?.map((user)=>(
            <div key={user.id} className='bg-[var(--bg-color)] rounded-xl p-2 my-3'>
              <div className='flex gap-3 items-center justify-between px-2'>

              <div>
                <Link href={`/profile/${user.username}`}>
                <Image src={user.image??'/default-avatar.png'} alt='Avatar' height={30} width={30} className='rounded-md'/>
                </Link>
              </div>
              <div>
            <Link  href={`/profile/${user.username}`}>
                <p className='text-[var(--text-color)] text-xs'>{user.name}</p>
            </Link>
<Link href={`/profile/${user.username}`}>
  <p className='text-[var(--secondary-text)] text-xs'>
    @{user.username.length > 10 ? `${user.username.slice(0, 7)}...` : user.username}
  </p>
</Link>
              </div>
                <div className='mt-2'>
                <FollowButton userId={user.id}/>
                </div>
              </div>
            </div>
        ))}
        <p className='w-fit'>
          <Link href={`/allusers`}>
             <Button size={"sm"} className='bg-[var(--btn-color)] text-[var(--bg-color)] cursor-pointer text-xs hover:bg-[var(--btn-hover)]'>
        See All
    </Button>
          </Link>
        </p>
    </div>
  )
}

export default WhoToFollow