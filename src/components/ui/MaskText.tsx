import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type MaskTextProps = {
  phrases: Array<string | React.ReactNode>;
  className?: string;
  lineClassName?: string;
  margin?: string; // rootMargin for in-view detection
  delayBase?: number; // base delay between lines
};

// Reusable mask text animation. Each phrase reveals upward when in view.
export const MaskText: React.FC<MaskTextProps> = ({
  phrases,
  className,
  lineClassName,
  margin = "-75%",
  delayBase = 0.075,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin });

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: delayBase * i,
      },
    }),
  } as const;

  return (
    <div ref={ref} className={cn("[mask-text]", className)}>
      {phrases.map((phrase, index) => (
        <div key={index} className={cn("overflow-hidden", lineClassName)}>
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : "initial"}
            className="will-change-transform"
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  );
};

export default MaskText;