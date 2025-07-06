import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import doYouSeeMeImage from "@assets/do u_1751762760792.jpg";

export default function Header() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isAnimating = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Trigger animation on scroll direction change or significant scroll
      if (Math.abs(currentScrollY - lastScrollY) > 30 && !isAnimating) {
        isAnimating = true;
        setShouldAnimate(true);
        
        setTimeout(() => {
          setShouldAnimate(false);
          isAnimating = false;
        }, 600);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial animation on load
    setTimeout(() => {
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 600);
    }, 1000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full py-8 px-4 bg-white z-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="inline-block"
          animate={shouldAnimate ? {
            y: [0, -15, 0],
            rotate: [0, -0.5, 0],
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            duration: 2.0,
            ease: "easeInOut",
          }}
        >
          <img 
            src={doYouSeeMeImage}
            alt="Do You See Me?" 
            className="max-w-full h-auto" 
            style={{ maxHeight: '120px' }} 
          />
        </motion.div>
      </div>
    </header>
  );
}
