"use client";
import {
  getProfileByUsername,
  getUserPosts,
  updateProfile,
} from "@/actions/profile.action";
import { getUserByClerkId, toggleFollow } from "@/actions/user.action";
import FollowButton from "@/components/FollowButton";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;
type DBUser = Awaited<ReturnType<typeof getUserByClerkId>>;
interface ProfilePageClientProps {
  user: NonNullable<User>;
  posts: Posts;
  likedPosts: Posts;
  isFollowing: boolean;
  mainUser: DBUser;
}

const ProfilePageClient = ({
  isFollowing: initialIsFollowing,
  likedPosts,
  posts,
  user,
  mainUser,
}: ProfilePageClientProps) => {
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
 
  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");
  return (
    <div>
      <div className="mb-5">
        <div className="h-[200px] overflow-hidden mb-3">
          <Image
            src={"/default-background.jpg"}
            alt="background"
            width={999}
            height={100}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[var(--text-color)] text-4xl font-bold">
              {user.name ?? user.username}
            </p>
            <p className="text-[var(--secondary-text)] text-xl">
              @{user.username}
            </p>
            {user.bio}
          </div>
          <div>
            <Image
              className="rounded-md"
              src={user.image ?? "default-avatar.png"}
              alt="Avatar"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <p className="text-[var(--text-color)] text-sm">
            <Link href={`/follow/${user.id}`}>
            {user._count.following.toLocaleString()} Following
            </Link>
          </p>
          <p className="text-[var(--text-color)] text-sm">
            <Link href={`/follow/${user.id}`}>
            {user._count.followers.toLocaleString()} Followers
            </Link>
          </p>
          <p className="text-[var(--text-color)] text-sm">
            {user._count.posts.toLocaleString()} Posts
          </p>
          <p className="text-[var(--btn-color)] text-sm">
            {`Joined ${formattedDate}`}
          </p>
        </div>

        <div className="mt-6">
          {(mainUser?.id===user.id)?null:
<FollowButton isFollowing={isFollowing} userId={user.id}/>}
        </div>
      </div>

      <h2 className="text-2xl text-[var(--text-color)] font-bold">Posts: </h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={mainUser?.id ?? null} />
        ))
      ) : (
        <div className="text-lg text-[var(--secondary-text)] font-bold">
          No posts yet...
        </div>
      )}

      <h2 className="text-2xl text-[var(--text-color)] font-bold">
        Liked Posts:
      </h2>
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={mainUser?.id ?? null} />
        ))
      ) : (
        <div className="text-lg text-[var(--secondary-text)]  font-bold">
          No liked posts to show...
        </div>
      )}
    </div>
  );
};

export default ProfilePageClient;
