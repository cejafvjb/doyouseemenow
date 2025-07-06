import { useState } from "react";
import Header from "@/components/header";
import UploadZone from "@/components/upload-zone";
import ImageGallery from "@/components/image-gallery";
import AdminControls from "@/components/admin-controls";

export default function Home() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="bg-white min-h-screen main-font">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <AdminControls 
          isAdminMode={isAdminMode} 
          setIsAdminMode={setIsAdminMode} 
        />
        
        <UploadZone />
        
        <ImageGallery isAdminMode={isAdminMode} />
      </main>
    </div>
  );
}
