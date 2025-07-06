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
      if (Math.abs(currentScrollY - lastScrollY) > 50 && !isAnimating) {
        isAnimating = true;
        setShouldAnimate(true);
        
        setTimeout(() => {
          setShouldAnimate(false);
          isAnimating = false;
        }, 800);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial animation on load
    setTimeout(() => {
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 800);
    }, 1000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="inline-block"
          animate={shouldAnimate ? {
            rotate: [-2, 2, -1, 0],
            scale: [1.02, 0.98, 1.01, 1],
          } : {}}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
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
