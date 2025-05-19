"use client"
import { toggleFollow } from '@/actions/user.action'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const FollowButton = ({userId}:{userId:string}) => {
    const [isLoading,setIsLoading] = useState(false)

    const handleFollow = async()=>{
        setIsLoading(true)
        try {
            await toggleFollow(userId);
            toast.success("User Followed Successfully!")
        } catch (error) {
            console.log("Error following user");
            toast.error("Couldn't follow user!")
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <Button disabled={isLoading} size={"icon"} onClick={handleFollow} className='bg-[var(--btn-color)] text-[var(--bg-color)] cursor-pointer text-xs hover:bg-[var(--btn-hover)]'>
        <Plus />
    </Button>
  )
}

export default FollowButton