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

// Predefine a slightly scattered, mostly single-line layout for the badges
const badgeLayout = [
  { x: 0, y: 0, r: -6 },
  { x: 60, y: 8, r: 4 },
  { x: 130, y: -6, r: -3 },
  { x: 210, y: 10, r: 7 },
  { x: 300, y: -8, r: 2 },
  { x: 390, y: 6, r: -5 },
  { x: 470, y: 0, r: 5 },
  { x: 550, y: -7, r: -4 },
  { x: 630, y: 8, r: 3 },
  { x: 710, y: -5, r: -2 },
  { x: 790, y: 7, r: 6 },
  { x: 870, y: 0, r: -7 },
  { x: 950, y: 5, r: 2 },
];

const AnimatedFallingTags: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center select-none pointer-events-none"
      style={{ zIndex: 1, minHeight: 90 }}
    >
      <div className="relative flex flex-row flex-nowrap justify-center items-end w-full" style={{ minHeight: 90 }}>
        {TAGS.map((tag, i) => {
          const layout = badgeLayout[i];
          const delay = 0.18 + i * 0.11 + random(0, 0.09);
          const duration = random(1.2, 1.6);
          const bounce = random(0.38, 0.55);
          return (
            <motion.div
              key={tag.text}
              initial={{ y: -100, opacity: 0, scale: 0.95, x: layout.x, rotate: random(-12, 12) }}
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
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                bounce,
              }}
              className={`rounded-full px-6 py-2 shadow-md font-semibold text-base md:text-lg whitespace-nowrap ${tag.color}`}
              style={{
                pointerEvents: "none",
                minWidth: 90,
                textAlign: "center",
                position: "absolute",
                left: 0,
                top: 0,
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