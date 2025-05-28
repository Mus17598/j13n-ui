
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
          "relative group overflow-hidden transition-all duration-500 font-semibold",
          variant === 'default' && "potion-pill",
          variant === 'secondary' && "potion-pill-outline",
          variant === 'outline' && "potion-pill-outline",
          size === 'default' && "px-8 py-3 text-base",
          size === 'sm' && "px-6 py-2 text-sm",
          size === 'lg' && "px-10 py-4 text-lg",
          size === 'xl' && "px-12 py-5 text-xl",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-3">
          {children}
          {showArrow && (
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
