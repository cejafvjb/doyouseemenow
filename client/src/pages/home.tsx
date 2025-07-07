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
      
      <main className="max-w-6xl mx-auto px-4 pb-8 pt-40 relative z-10">
        <AdminControls 
          isAdminMode={isAdminMode} 
          setIsAdminMode={setIsAdminMode} 
        />
        
        <UploadZone />
        
        <ImageGallery isAdminMode={isAdminMode} />
        
        {/* Credits section */}
        <div className="mt-16 text-center">
          <div className="text-black text-sm main-font max-w-2xl mx-auto px-4 leading-relaxed">
            Site made with replit. FONT CREDIT to plain-form.com, typeface- ready active light. Non comercial use
            <br /><br />
            contact me for more info- touskovazuza@gmail.com
          </div>
        </div>
      </main>
    </div>
  );
}
