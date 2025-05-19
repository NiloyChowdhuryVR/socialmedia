// components/ImageUpload.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.url;
        if (url) {
          onUploadComplete(url);
        }
      }}
      
              appearance={{
            button: {
              background: "var(--btn-color)",
              color: "var(--bg-color)",
            },
            allowedContent:{
              color: "var(--text-color)"
            }
          }}


      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        alert("Upload failed!");
      }}
    />
  );
}
