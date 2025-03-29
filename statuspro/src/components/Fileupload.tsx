"use client";
import { useState } from "react";
import { IKUpload } from "imagekitio-next";

import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileuploadProps{
    onSuccess:(res:IKUploadResponse)=>void;
    onProgress?:(progress:number)=>void;
    fileType?:"image" | "video";
}



export default function FileUplaod({onSuccess,onProgress,fileType="image"}:FileuploadProps) {
  
  const [uploading, setUploading] = useState(false);
  
    const [error, setError] = useState<string | null>(null);

  const onError = (err :{message:string}) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };
  
  const onUploadProgress = (evt: ProgressEvent) => {

    if(evt.lengthComputable && onProgress){
        const progress = Math.round((evt.loaded / evt.total) * 100);
        onProgress(progress);
    }
  
    console.log("Uploading...");
  };
  
  const onUploadStart = () => {
    setUploading(true);
    setError(null);
    console.log("Start");
  };

  const validateFile = (file: File) => {

    if(fileType === "video") {
      if(!file.type.startsWith("video/")) {
        setError("Please upload a video file.");
        return false;
      }

      if(file.size > 100 * 1024 * 1024) {
        setError("Video must be less than 100MB.");
        return false;

      }
    }else {
        const validTypes = ["image/jpeg", "image/png"];
        if(!validTypes.includes(file.type)) {
          setError("Please upload a valid image file (JPEG, PNG).");
          return false;
        }
        if(file.size > 5 * 1024 * 1024) {
            setError("Video must be less than 5MB.");
            return false;
    
          }
    }

    return false;
      
    
    }

  return (
    <div className="space-y-2">
      <h1>ImageKit Next.js quick start</h1>
     
        <p>Upload an image with advanced options</p>
        <IKUpload
          fileName={fileType === "image" ? "image" : "video"}
      
          useUniqueFileName={true}
      
          validateFile={validateFile}
      accept={fileType === "image" ? "image/*" : "video/*"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          folder={fileType === "image" ? "/images" : "/videos"}
          className="file-input file-input-bordered w-full"
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
       
          
        />
        { uploading && 
        <div className="flex items-center  gap-2 text-sm text-primary">
            <Loader2 size={32} color="#212121" className="animate-spin w-4 h-4" />
            <span>Uploading...</span>
        </div>
        }

        {error && 
        <div className="text-error text-sm">{error}</div>
        }
       
    </div>
  );
}