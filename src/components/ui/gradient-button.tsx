
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  showArrow?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, variant = 'default', size = 'default', showArrow = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative group overflow-hidden transition-all duration-300",
          variant === 'default' && "bg-gradient-to-r from-primary-purple to-primary-blue hover:opacity-90",
          variant === 'secondary' && "bg-secondary hover:bg-secondary/80",
          variant === 'outline' && "bg-transparent border border-white/20 hover:bg-white/5",
          size === 'default' && "px-6 py-2 text-sm",
          size === 'sm' && "px-4 py-1 text-sm",
          size === 'lg' && "px-8 py-3 text-base",
          size === 'xl' && "px-10 py-4 text-lg font-medium",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-purple/80 to-primary-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
