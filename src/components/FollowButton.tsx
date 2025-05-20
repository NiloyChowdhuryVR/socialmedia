"use client"
import { toggleFollow } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const FollowButton = ({userId,isFollowing:initialIsFollowing}:{userId:string,isFollowing:boolean}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFollowing,setIsFollowing] = useState(initialIsFollowing)

    // const handleFollow = async()=>{
    //     setIsLoading(true)
    //     try {
    //         await toggleFollow(userId);
    //         toast.success("User Followed Successfully!")
    //     } catch (error) {
    //         console.log("Error following user");
    //         toast.error("Couldn't follow user!")
    //     }finally{
    //         setIsLoading(false)
    //     }
    // }
      const handleFollow = async () => {
    try {
      setIsLoading(true);
      await toggleFollow(userId);
      {isFollowing?(toast.error("Unfollowed SuccesFully")):(toast.success("Follow Succesfull"))}
      setIsFollowing(!isFollowing);
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };
  return (
          <Button
            disabled={isLoading}
            onClick={handleFollow}
            className={`h-[50px] w-[50px] cursor-pointer text-[var(--bg-color)]  text-xs  ${
              isFollowing
                ? `bg-gray-500 hover:bg-gray-300`
                : `bg-[var(--btn-color)] hover:bg-[var(--btn-hover)]`
            }`}
          >
            {isFollowing ? <X /> : <Plus />}
          </Button>
  )
}

export default FollowButton