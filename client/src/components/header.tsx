import { motion } from "framer-motion";
import doYouSeeMeImage from "@assets/do u_1751762760792.jpg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full py-8 px-4 z-0">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="inline-block"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -0.5, 0],
          }}
          transition={{
            duration: 4.0,
            ease: "easeInOut",
            repeat: Infinity,
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
