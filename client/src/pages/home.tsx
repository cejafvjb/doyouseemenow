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
        
        {/* Extra content for scrolling */}
        <div className="mt-16 space-y-8">
          <div className="h-96 flex items-center justify-center">
            <div className="text-black text-lg">Scroll up and down to see the animation</div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-black text-lg">Keep scrolling to test the floating effect</div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-black text-lg">The header image should bounce when you scroll</div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-black text-lg">Try scrolling in different directions</div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-black text-lg">More space for testing the scroll animation</div>
          </div>
        </div>
      </main>
    </div>
  );
}
