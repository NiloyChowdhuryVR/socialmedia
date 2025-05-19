import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
  } from "@/actions/profile.action";
  import { notFound } from "next/navigation";
  import ProfilePageClient from "./ProfilePageClient";
import { getDbUserId, getUserByClerkId } from "@/actions/user.action";
import { auth } from "@clerk/nextjs/server";
  
  export async function generateMetadata({ params }: { params: Promise<{ username: string }>  }) {
    const resolvedParams = await params;
    const user = await getProfileByUsername(resolvedParams.username);
    if (!user) return;
  
    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile.`,
    };
  }
  
  async function ProfilePageServer({ params }: { params:  Promise<{ username: string }>  }) {
    const resolvedParams = await params;
    const user = await getProfileByUsername(resolvedParams.username);
  
    if (!user) notFound();

    const session = await auth();
    const currentUserId = session.userId;

    const [posts, likedPosts, isCurrentUserFollowing,mainUser] = await Promise.all([
      getUserPosts(user.id),
      getUserLikedPosts(user.id),
      isFollowing(user.id),
      getUserByClerkId(currentUserId!)
    ]);
  
    return (
      <ProfilePageClient
      mainUser={mainUser}
        user={user}
        posts={posts}
        likedPosts={likedPosts}
        isFollowing={isCurrentUserFollowing}
      
      />
    );
  }
  export default ProfilePageServer;