import { getAllUsers } from '@/actions/user.action'
import FollowButton from '@/components/FollowButton';
import React from 'react'

const page = async() => {

    const allUsers = await getAllUsers();

  return (
    <div>
        {allUsers?.map((user)=>(
            <div key={user.id}>
                <p className='text-2xl bg-red-200 w-fit'>{user.name}</p>
                <p>{user.username}</p>
                <FollowButton userId={user.id}/>
            </div>
        ))}
    </div>
  )
}

export default page