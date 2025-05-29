
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TAGS = [
  { text: "Awesome", color: "bg-purple-200 text-purple-800" },
  { text: "Whoa", color: "bg-yellow-100 text-yellow-700" },
  { text: "Next-level", color: "bg-green-100 text-green-700" },
  { text: "mind-blowingly", color: "bg-mint-200 text-green-800" },
  { text: "Perfect!", color: "bg-pink-200 text-pink-800" },
  { text: "Fantastic", color: "bg-peach-200 text-orange-700" },
  { text: "Unreal", color: "bg-indigo-200 text-indigo-800" },
  { text: "Time-saving", color: "bg-blue-100 text-blue-700" },
  { text: "Incredible", color: "bg-yellow-200 text-yellow-800" },
  { text: "Super useful", color: "bg-fuchsia-100 text-fuchsia-700" },
  { text: "Game-changer", color: "bg-lime-100 text-lime-700" },
  { text: "Wow", color: "bg-pink-100 text-pink-700" },
  { text: "Magic", color: "bg-purple-100 text-purple-700" },
];

// Helper for random values
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Create more spaced out layout with multiple rows
const createOrganicLayout = () => {
  const positions = [];
  const rows = 3;
  const itemsPerRow = Math.ceil(TAGS.length / rows);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < itemsPerRow && positions.length < TAGS.length; col++) {
      const baseX = (col * 200) + random(-30, 30); // More spacing between items
      const baseY = (row * 60) + random(-20, 20); // Multiple rows with variation
      const rotation = random(-8, 8);
      
      positions.push({ x: baseX, y: baseY, r: rotation });
    }
  }
  
  return positions;
};

const badgeLayout = createOrganicLayout();

const AnimatedFallingTags: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center select-none pointer-events-none overflow-hidden"
      style={{ zIndex: 1, minHeight: 220 }}
    >
      <div className="relative w-full max-w-6xl" style={{ minHeight: 220 }}>
        {TAGS.map((tag, i) => {
          const layout = badgeLayout[i];
          const delay = 0.3 + i * 0.15 + random(0, 0.2); // Slower, more staggered
          const duration = random(2.0, 2.8); // Much slower falling
          const fallDistance = random(180, 250); // More varied fall distances
          
          return (
            <motion.div
              key={tag.text}
              initial={{ 
                y: -fallDistance, 
                opacity: 0, 
                scale: 0.8, 
                x: layout.x + random(-20, 20), 
                rotate: random(-15, 15) 
              }}
              animate={
                inView
                  ? {
                      y: layout.y,
                      opacity: 1,
                      scale: 1,
                      x: layout.x,
                      rotate: layout.r,
                    }
                  : {}
              }
              transition={{
                delay,
                duration,
                ease: [0.25, 0.46, 0.45, 0.94], // More organic easing
                type: "spring",
                bounce: 0.3,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotate: layout.r + random(-3, 3),
                transition: { duration: 0.3 }
              }}
              className={`rounded-full px-5 py-2.5 shadow-lg font-medium text-sm md:text-base whitespace-nowrap ${tag.color} backdrop-blur-sm border border-white/20`}
              style={{
                pointerEvents: "auto",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: TAGS.length - i, // Layer badges so they don't overlap awkwardly
              }}
            >
              {tag.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedFallingTags;
