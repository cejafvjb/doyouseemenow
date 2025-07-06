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
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="inline-block"
          animate={shouldAnimate ? {
            x: [0, -8, 12, -6, 4, -2, 0],
            y: [0, 6, -10, 8, -4, 2, 0],
            rotate: [0, -3, 5, -2, 3, -1, 0],
            scale: [1, 1.05, 0.95, 1.08, 0.92, 1.02, 1],
            skewX: [0, -2, 4, -3, 1, 0],
            skewY: [0, 1, -3, 2, -1, 0],
          } : {}}
          transition={{
            duration: 0.6,
            ease: "linear",
            times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]
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
