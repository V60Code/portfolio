import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollProps {
  sectionRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLElement>;
  disabled?: boolean;
}

export const useHorizontalScroll = ({
  sectionRef,
  contentRef,
  disabled = false,
}: UseHorizontalScrollProps) => {
  useEffect(() => {
    if (disabled || !sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Calculate the scroll distance
    const scrollDistance = content.scrollWidth - section.clientWidth;

    // Create the horizontal scroll animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      pin: true,
      pinSpacing: true, // Allow proper spacing to prevent collision
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(content, {
        x: -scrollDistance,
        ease: "none",
      }),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [sectionRef, contentRef, disabled]);
};
