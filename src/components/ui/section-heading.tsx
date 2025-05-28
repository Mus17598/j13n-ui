
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  size = "default"
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-16",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 
        className={cn(
          "font-display font-bold gradient-text tracking-tight leading-tight",
          size === "default" && "text-5xl md:text-6xl lg:text-7xl",
          size === "sm" && "text-4xl md:text-5xl",
          size === "lg" && "text-6xl md:text-7xl lg:text-8xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <motion.p 
          className="mt-8 text-xl md:text-2xl text-slate-500 leading-relaxed font-light max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
