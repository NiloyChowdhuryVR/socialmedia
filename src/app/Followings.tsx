import { getFollowing } from '@/actions/follow.action';
import { isFollowing } from '@/actions/profile.action';
import FollowButton from '@/components/FollowButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Followings {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
}

const Followings = async({userId}:{userId:string}) => {

    const followings:Followings[] = await getFollowing(userId);

      const followingsWithFollowStatus = await Promise.all(
    followings.map(async (user) => {
      const following = await isFollowing(user.id);
      return {
        ...user,
        isFollowing: following,
      };
    })
  );

    

  return (
    <div>{
      followingsWithFollowStatus.length === 0? (
        <div className='text-[var(--secondary-text)] text-lg font-semibold text-center mt-30'>
          <p>
            You do not have any Followings currently!
            </p>
            <p className='text-sm'>
              Follow someone to add them here
            </p>
        </div>
      ): null
      }
        <div className='flex flex-col items-center gap-0'>
        {followingsWithFollowStatus?.map((user)=>(
            <div key={user.id} className='bg-[var(--primary-color)] rounded-xl p-2 my-1 w-[200px]'>
              <div className='flex gap-3 items-center justify-between'>
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
  <Link href={`/profile/${user.username}`}>
  <p className=' text-[var(--secondary-text)] text-xs'>
    @{user.username.length > 10 ? `${user.username.slice(0, 7)}...` : user.username}
  </p>
</Link>
        </div>
              </div>
                <div className='mt-2'>
                <FollowButton userId={user.id} isFollowing={user.isFollowing}/>
                </div>
              </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Followings