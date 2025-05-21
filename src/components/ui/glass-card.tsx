
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = false, glowEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glassmorphism p-6 transition-all duration-300",
          hoverEffect && "hover:scale-[1.02] hover:bg-white/10",
          glowEffect && "glow-effect",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
