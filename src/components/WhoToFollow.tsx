import { getRandomUsers } from '@/actions/user.action'
import React from 'react'
import { Button } from './ui/button';
import FollowButton from './FollowButton';
import Link from 'next/link';

const WhoToFollow = async() => {

    const users = await getRandomUsers();
    if(users?.length===0) return null;

  return (
    <div>
        Follow Them:
        {users?.map((user)=>(
            <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.username}</p>
                <FollowButton userId={user.id}/>
            </div>
        ))}
        <p className='bg-gray-400 w-fit'>
          <Link href={`/allusers`}>
            See All Users!
          </Link>
        </p>
    </div>
  )
}

export default WhoToFollow