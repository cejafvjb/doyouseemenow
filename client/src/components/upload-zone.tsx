import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function UploadZone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });
      
      const response = await apiRequest('POST', '/api/images/upload', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "Upload successful!",
        description: "Your images have been uploaded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    },
  });

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const invalidFiles = Array.from(files).filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Only JPG, PNG, and GIF files are allowed.",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="mb-12 text-center">
      <div className="text-black text-xl mb-8 main-font">
        RANDOM PROJEKT
      </div>
      
      <div 
        className={`upload-zone w-full py-16 px-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragOver ? 'bg-gray-50' : 'hover:bg-gray-50'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-black text-lg mb-4">
          {uploadMutation.isPending ? 'Uploading...' : 'Drop images here or click to upload'}
        </div>
        <div className="text-black text-sm">
          Supports JPG, PNG, GIF
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          multiple 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      
      {uploadMutation.isPending && (
        <div className="mt-4 text-center text-black">
          <div>Uploading...</div>
        </div>
      )}
    </div>
  );
}
