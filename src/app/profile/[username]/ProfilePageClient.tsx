"use client"
import { getProfileByUsername, getUserPosts, updateProfile } from '@/actions/profile.action'
import { getUserByClerkId, toggleFollow } from '@/actions/user.action'
import PostCard from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type User = Awaited<ReturnType<typeof getProfileByUsername>>
type Posts = Awaited<ReturnType<typeof getUserPosts>>
type DBUser = Awaited<ReturnType<typeof getUserByClerkId>>;
interface ProfilePageClientProps {
    user:NonNullable<User>
    posts: Posts
    likedPosts: Posts
    isFollowing : boolean
    mainUser : DBUser
}

const ProfilePageClient = ({isFollowing:initialIsFollowing,likedPosts,posts,user,mainUser}:ProfilePageClientProps) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  
    const [editForm, setEditForm] = useState({
      name: user.name || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
    });
  
    const handleEditSubmit = async () => {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const result = await updateProfile(formData);
      if (result.success) {
        setShowEditDialog(false);
        toast.success("Profile updated successfully");
      }
    };
    // console.log(mainUser)
    const handleFollow = async () => {
      if (!mainUser) return;
  
      try {
        setIsUpdatingFollow(true);
        await toggleFollow(user.id);
        setIsFollowing(!isFollowing);
      } catch (error) {
        toast.error("Failed to update follow status");
      } finally {
        setIsUpdatingFollow(false);
      }
    };
  
    // const isOwnProfile =
    //   mainUser?.username === user.username ||
    //   mainUser?.email.split("@")[0] === user.username;
  
    const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");
  return (
    <div>
        {user.name ?? user.username}
        @{user.username}
        {user.bio}


        {user._count.following.toLocaleString()} Following

        {user._count.followers.toLocaleString()} Followers

        {user._count.posts.toLocaleString()} Posts

        {/* {!mainUser ? (
            <SignInButton>
                <Button>Follow</Button>
            </SignInButton>
        ): isOwnProfile ? (
            <Button onClick={()=>setShowEditDialog(true)}>Edit Profile</Button>
        ):(
            <Button>{isFollowing ? "Unfollow" : "Follow"}</Button>
        )} */}

        {`Joined ${formattedDate}`}

        <h2>Posts</h2>
        {posts.length > 0 ? (
            posts.map((post)=> <PostCard key={post.id} post={post} dbUserId={mainUser?.id ?? null}/>)
        ) : (
            <div>No posts yet...</div>
        )}

        <h2>Liked Posts</h2>
        {likedPosts.length>0?(
            likedPosts.map((post)=><PostCard key={post.id} post={post} dbUserId={mainUser?.id ?? null}/>)
        ): (
            <div>No liked posts to show...</div>
        )}
    </div>
  )
}

export default ProfilePageClient