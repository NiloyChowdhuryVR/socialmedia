"use client";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import { Link } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
// import { UploadDropzone } from '../utils/uploadthing';

const CreatePost = () => {
  const { user , isLoaded} = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


if (!isLoaded) return (
  <div>
    <Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
          <Skeleton className="w-[70px] h-[20px] rounded-full my-2" />
          <Skeleton className="w-full h-[20px] rounded-full my-2" />
  </div>
);
if (!user) return <div className="text-3xl text-[var(--text-color)]"> Loginnnnn to Post</div>;

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Post created Successfully!!");
      }
    } catch (error) {
    } finally {
      setIsPosting(false);
      setImageUploaded(false);
    }
  };
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setImageUploaded(true);
  };


  const handleInput = (e:any) => {
    setContent(e.target.value)
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset to auto first
      const scrollHeight = Math.min(el.scrollHeight, 200); // limit max height here (200px)
      el.style.height = `${scrollHeight}px`;
    }
  };
  return (
    <>
    <div className="p-5 bg-[var(--primary-color)] rounded-t-xl flex justify-center items-center gap-5">
    
      <Image src={user?.imageUrl} alt="Avatar" width={40} height={40} className="rounded-[50%] "/>
<div className="flex-1 flex flex-col gap-5">

      <Textarea
      ref={textareaRef}
      placeholder="What's on your mind?"
      value={content}
      onChange={handleInput}
      disabled={isPosting}
      
      className="bg-[var(--bg-color)] text-[var(--text-color)] resize-none no-scrollbar focus:ring-1 focus:ring-[var(--custom-color)]"
      />

        {/* THE ATTACTHMENT AND POST BUTTONS  */}
<div className="flex ">

      {imageUploaded ? null : (
        <Button
        onClick={() => setShowImageUpload((prev) => !prev)}
        disabled={isPosting}
        className="rounded-none rounded-l-xl bg-[var(--btn-color)] text-[var(--bg-color)] hover:bg-[var(--btn-hover)] cursor-pointer"
        >
          <Link />
        </Button>
      )}
      <Button onClick={handleSubmit} disabled={!content && !imageUploaded} className="rounded-none rounded-r-xl bg-[var(--btn-color)] text-[var(--bg-color)] hover:bg-[var(--btn-hover)] cursor-pointer mb-3">POST</Button>
      </div>
      </div>
      </div>
      {(showImageUpload || imageUrl) && (
        <div className="bg-[var(--primary-color)] rounded-b-xl p-3">
          {imageUrl && (
            <img
            src={imageUrl}
            alt="Preview"
            className="w-48 h-48 object-cover rounded"
            />
          )}
          <ImageUpload onUploadComplete={handleImageUpload} />
        </div>
      )}
    </>
  );
};

export default CreatePost;
