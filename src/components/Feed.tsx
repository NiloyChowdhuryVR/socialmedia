import { getPosts } from '@/actions/post.action'
import { getDbUserId } from '@/actions/user.action';
import React from 'react'
import PostCard from './PostCard';

const Feed = async() => {
    const posts = await getPosts();
    const dbUserId = await getDbUserId();
    
  return (
    <div>

    {posts.map((post)=>(
      <PostCard key={post.id} post={post} dbUserId={dbUserId}/>
    ))}
    </div>
  )
}

export default Feed