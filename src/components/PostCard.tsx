"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import {
  createComment,
  deletePost,
  getPosts,
  toggleLike,
} from "@/actions/post.action";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import Image from "next/image";
import { Crown, Trash2 } from "lucide-react";
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const PostCard = ({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        toast.success("Comment Added!");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Couldn't add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result?.success) {
        toast.success("Post Deleted!");
      }
    } catch (error) {
      toast.error("Couldn't delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-[var(--primary-color)] my-3 p-5 rounded-xl">
      <div>
        {/* LEFT PART OF POST HEADING  */}
        <div className="flex justify-between">
          {/* USERNAME AVATAR  */}
          <div className="flex gap-3 items-center pb-3">
            <div>
                <Link href={`/profile/${post.author.username}`}>
              <Image
                src={post.author.image ?? "/default-avatar.png"}
                alt="Avatar"
                height={40}
                width={40}
                className="rounded-lg"
                />
                </Link>
            </div>
            {/* NAME,USERNAME,CREATED  */}

            <div>
              <p className="w-fit text-[var(--secondary-text)]">
                <Link href={`/profile/${post.author.username}`}>
                  @{post.author.username}
                </Link>
              </p>

              <div className="flex gap-3">
                <p className="text-[var(--text-color)] w-fit">
                  <Link href={`/profile/${post.author.username}`}>
                    {post.author.name}
                  </Link>
                </p>
                <p className="text-[var(--btn-hover)]">
                  {`${formatDistanceToNow(new Date(post.createdAt))} ago`}{" "}
                </p>
              </div>
            </div>
          </div>
        <div>
          <p>
            {" "}
            {dbUserId === post.author.id && (
                <Button
                className="rounded-[50%] bg-transparent hover:text-red-400 cursor-pointer"
                disabled={isDeleting}
                onClick={handleDeletePost}
                >
                <Trash2 />
              </Button>
            )}{" "}
          </p>
        </div>
            </div>
            <div>

        <p className="pb-5 w-fit text-[var(--text-color)]"> {post.content} </p>
            </div>
      </div>

      <div className="max-w-[300px] ">
        {post.image && (
          <div>
            <img src={post.image} alt="Post Image" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 py-3">

        {user ? (
            <Button onClick={handleLike} className="bg-transparent cursor-pointer">
            {hasLiked ?<FavoriteIcon className="text-[var(--btn-color)]"/>: <FavoriteBorderIcon/>}
            <span>{optimisticLikes}</span>
          </Button>
        ) : (
            <SignInButton />
        )}

        {user ? (
        <Button className="bg-transparent cursor-pointer" onClick={() => setShowComments((prev) => !prev)}>
          {showComments ? <ChatBubbleIcon className="text-[var(--btn-color)]"/>: <ChatBubbleOutlineIcon/>}
          {post.comments.length}
        </Button>
        ):<SignInButton/>}
      </div>

      <div>
        {showComments && (
          <div>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <div className="flex items-center gap-3">

                <div>
                    <Image className="rounded-md" src={comment.author.image ?? '/default-avatar.png'} alt="Avatar" width={20} height={20}/>
                </div>
                <div>
<div className="flex gap-2 items-center">

                <p className="text-xs text-[var(--text-color)]"> {comment.author.name} </p>
                <span>{comment.author.username == post.author.username? <Crown color="var(--btn-color)" size={13}/> : null}</span>
</div>
                <div className="flex gap-3">

                <p className="text-xs text-[var(--secondary-text)]"> @{comment.author.username} </p>
                <span className="text-xs text-[var(--btn-hover)]">{formatDistanceToNow(new Date(comment.createdAt))}</span>
                </div>
                </div>
                </div>
                <div className="pb-5 pt-2 text-[var(--text-color)] text-sm">
                <p> {comment.content} </p>
                </div>
              </div>
            ))}
            {user ? (
              <div className="flex items-center gap-5">
                <Textarea
                className="resize-none text-sm text-[var(--text-color)]"
                  placeholder="Comment Now"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                />
                <Button
                className="bg-[var(--btn-color)] text-[var(--bg-color)] hover:bg-[var(--btn-hover)] cursor-pointer"
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isCommenting}
                >
                  Comment
                </Button>
              </div>
            ) : (
              <p>Login to Comment</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
