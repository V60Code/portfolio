import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticLogoProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const MagneticLogo = ({ children, className = '', title }: MagneticLogoProps) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    if (magnetic.current) {
      magnetic.current.addEventListener("mousemove", mouseMove);
      magnetic.current.addEventListener("mouseleave", mouseLeave);
    }

    return () => {
      if (magnetic.current) {
        magnetic.current.removeEventListener("mousemove", mouseMove);
        magnetic.current.removeEventListener("mouseleave", mouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={magnetic}
      className={`cursor-pointer ${className}`}
      title={title}
    >
      {children}
    </div>
  );
};