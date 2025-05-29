import React, { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 12;
const CURSOR_COLOR = "#4338ca"; // indigo-700
const SCALE_ON_HOVER = 1.8;
const INTERACTIVE_SELECTORS = "button, a, [role='button'], input, textarea, select, label, .cursor-pointer";

const AnimatedCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Mouse move handler
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Animation loop for trailing effect
  useEffect(() => {
    let frame: number;
    const animate = () => {
      // Lerp for smooth trailing
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - CURSOR_SIZE / 2}px, ${pos.current.y - CURSOR_SIZE / 2}px, 0) scale(${isHovering ? SCALE_ON_HOVER : 1})`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [isHovering]);

  // Detect hover on interactive elements
  useEffect(() => {
    const setHover = (hover: boolean) => setIsHovering(hover);
    const handlePointerOver = (e: Event) => {
      if ((e.target as Element)?.closest(INTERACTIVE_SELECTORS)) setHover(true);
    };
    const handlePointerOut = (e: Event) => {
      if ((e.target as Element)?.closest(INTERACTIVE_SELECTORS)) setHover(false);
    };
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: "50%",
        background: CURSOR_COLOR,
        pointerEvents: "none",
        zIndex: 9999,
        boxShadow: "0 2px 8px 0 rgba(67,56,202,0.12)",
        transition: "background 0.2s, box-shadow 0.2s",
        mixBlendMode: "multiply",
      }}
    />
  );
};

export default AnimatedCursor; 