"use client"
import { SignInButton, useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import {createComment, deletePost, getPosts, toggleLike} from "@/actions/post.action"
import toast from 'react-hot-toast';
import {formatDistanceToNow} from "date-fns"
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import Link from 'next/link';

type Posts = Awaited<ReturnType<typeof getPosts>>
type Post = Posts[number]

const PostCard = ({post,dbUserId}:{post:Post;dbUserId: string | null}) => {
    const {user} = useUser();
    const [newComment,setNewComment] = useState("")
    const [isCommenting,setIsCommenting]=useState(false)
    const [isLiking,setIsLiking] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)
    const [hasLiked,setHasLiked]=useState(post.likes.some(like=>like.userId === dbUserId))
    const [optimisticLikes,setOptimisticLikes]=useState(post._count.likes)
    const [showComments,setShowComments] = useState(false);

    const handleLike = async()=>{
        if(isLiking) return;
        try {
            setIsLiking(true)
            setHasLiked(prev => !prev)
            setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1))
            await toggleLike(post.id)
        } catch (error) {
            setOptimisticLikes(post._count.likes)
            setHasLiked(post.likes.some(like => like.userId === dbUserId))
        }finally{
            setIsLiking(false)
        }
    }

    const handleAddComment = async()=>{
        if(!newComment.trim() || isCommenting) return;
        try {
            setIsCommenting(true)
            const result = await createComment(post.id,newComment);
            if(result?.success){
                toast.success("Comment Added!");
                setNewComment("");
            }
        } catch (error) {
            toast.error("Couldn't add comment")
        }finally{
            setIsCommenting(false)
        }
        
    }

    const handleDeletePost = async()=>{
        if(isDeleting) return;
        try {
            setIsDeleting(true)
            const result = await deletePost(post.id);
            if(result?.success){
                toast.success("Post Deleted!");
            }
        } catch (error) {
            toast.error("Couldn't delete post")
        }finally{
            setIsDeleting(false)
        }
        
    }



  return (
    <div>

    <div>
        <p  className='bg-red-200 w-fit' >
        <Link href={`/profile/${post.author.username}`}>
             {post.author.name}
        </Link>
             </p>
       <p  className='bg-blue-200 w-fit' >
        <Link href={`/profile/${post.author.username}`}>
             {post.author.username}
        </Link>
             </p>
        <p> {`Created ${formatDistanceToNow(new Date(post.createdAt))} ago`} </p>
        <p> {dbUserId === post.author.id && (
            <Button variant={"destructive"} disabled={isDeleting} onClick={handleDeletePost}>Detele Post</Button>
        )} </p>
        <p className='bg-green-300 w-fit'> {post.content} </p>
    </div>

    <div className='w-[200px] '>
        {post.image && (
            <div>
                <img src={post.image} alt="Post Image" />
            </div>
        )}
    </div>
    <div>
        {user ? <Button onClick={handleLike}>{hasLiked? <p>Liked</p>: <p>Like</p>}</Button> : <SignInButton/>}
        <span>{optimisticLikes}</span>


        <Button onClick={()=>setShowComments((prev)=>!prev)}>
            {showComments? "Comments" : "No Comments"}
            {post.comments.length}
        </Button>
    </div>

    <div>
        {showComments && (
            <div>{post.comments.map((comment)=>(
                <div key={comment.id}>
                    <p> {comment.author.name} </p>
                    <p> {comment.author.username} </p>
                    <span>{formatDistanceToNow(new Date(comment.createdAt))}</span>
                    <p> {comment.content} </p>
                </div>
            ))}
            {user ? (
                <>
                <Textarea placeholder='Comment Now' onChange={(e)=>setNewComment(e.target.value)} value={newComment}/>
                <Button onClick={handleAddComment} disabled={!newComment.trim() || isCommenting}>Comment</Button>
                </>
            ): <p>Login to Comment</p>}
                </div>
        )}
    </div>


        </div>
  )
}

export default PostCard