
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
        "mb-12",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 
        className={cn(
          "font-display font-bold gradient-text",
          size === "default" && "text-4xl md:text-5xl",
          size === "sm" && "text-3xl md:text-4xl",
          size === "lg" && "text-5xl md:text-6xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
