import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Deprecated: Use DaisyUI `btn` classes instead.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const base = "btn";
  const variantClass =
    variant === "destructive"
      ? "btn-error"
      : variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
      ? "btn-ghost"
      : variant === "outline"
      ? "btn-outline"
      : variant === "link"
      ? "btn-link"
      : variant === "primary" || variant === "default" || !variant
      ? "btn-primary"
      : "";
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : size === "icon" ? "btn-square" : "";
  return <Comp className={cn(base, variantClass, sizeClass, className)} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button };
