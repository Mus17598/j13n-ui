import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Zap, Shield, BarChart, MousePointer, Users } from "lucide-react";

const features = [
  { icon: MousePointer, title: "One-Click Applications", desc: "Apply to multiple job platforms instantly with a single click." },
  { icon: Clock, title: "Save Hours Daily", desc: "Automate your job search and focus on interview preparation." },
  { icon: Zap, title: "Multi-Platform Support", desc: "Works seamlessly with LinkedIn, Indeed, Naukri, and more." },
  { icon: BarChart, title: "Application Tracking", desc: "Monitor your applications and success rates in real-time." },
  { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and protected with enterprise-grade security." },
  { icon: Users, title: "Trusted by Thousands", desc: "Join over 10,000+ job seekers who've found success with AplyGen." }
];

const SECTION_HEIGHT = 100; // vh

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // The scroll length is (number of features - 1) * 100vh
  const scrollLength = (features.length - 1) * SECTION_HEIGHT;

  // Framer Motion scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", `end start`]
  });

  // Horizontal translation for the features container
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(features.length - 1) * 100}vw`]
  );

  // Parallax background movement
  const bgX = useTransform(scrollYProgress, [0, 1], ["0vw", "-20vw"]);

  return (
    <section
      ref={sectionRef}
      style={{
        height: `${scrollLength + SECTION_HEIGHT}vh`,
        position: "relative",
        zIndex: 1,
      }}
      aria-label="Features"
    >
      {/* Sticky container for horizontal scroll */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Parallax background */}
        <motion.div
          aria-hidden
          style={{
            x: bgX,
            position: "absolute",
            top: 0,
            left: 0,
            width: "120vw",
            height: "100vh",
            background: "#fff",
            zIndex: 0,
          }}
        />
        {/* Horizontally scrolling features */}
        <motion.div
          style={{
            x,
            display: "flex",
            flexDirection: "row",
            width: `${features.length * 100}vw`,
            height: "100vh",
            zIndex: 1,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center w-screen h-full px-8 bg-white"
              style={{
                minWidth: "100vw",
                maxWidth: "100vw",
                flex: "0 0 100vw",
              }}
              tabIndex={0}
              aria-label={feature.title}
            >
              <h3 className="text-6xl md:text-7xl lg:text-8xl font-black text-indigo-700 text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
