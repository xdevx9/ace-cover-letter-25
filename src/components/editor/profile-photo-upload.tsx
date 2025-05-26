
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfilePhotoUploadProps {
  onPhotoUpload: (photoData: string) => void;
}

export function ProfilePhotoUpload({ onPhotoUpload }: ProfilePhotoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onPhotoUpload(result);
      toast({
        title: "Photo Uploaded",
        description: "Profile photo has been added to your resume.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 transition-colors
          ${isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''}
        `}
        title="Upload profile photo"
      >
        <Image className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline ml-1">Photo</span>
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 border-2 border-dashed border-blue-500 rounded">
          <Upload className="h-4 w-4 text-blue-500" />
        </div>
      )}
    </div>
  );
}
