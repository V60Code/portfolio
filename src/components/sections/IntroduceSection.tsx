import { useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import useMousePosition from "@/hooks/use-mouse-position";

export const IntroduceSection = () => {
  const { x, y } = useMousePosition();
  const [hovered, setHovered] = useState(false);
  const size = hovered ? 280 : 40; // kecil saat tidak hover agar selalu terlihat
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth tween for mask size using spring motion value
  const maskSize = useMotionValue(0);
  const maskSizeSpring = useSpring(maskSize, { stiffness: 220, damping: 24 });
  const maskSizePx = useMotionTemplate`${maskSizeSpring}px`;

  useEffect(() => {
    maskSize.set(size);
  }, [size, maskSize]);

  const rect = containerRef.current?.getBoundingClientRect();
  const localX = rect ? x - rect.left : x;
  const localY = rect ? y - rect.top : y;

  return (
    <section
      id="introduce"
      data-scroll-section
      className="section-min section-spacing flex items-center justify-center px-4 sm:px-6 lg:px-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <span className="section-tag">INTRODUCE</span>
        </div>

        {/* Bungkus heading + paragraf dalam container relatif agar overlay tepat menumpuk */}
        <div ref={containerRef} className="relative isolate">
          {/* Base content */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 md:mb-8 text-foreground">
            Say Hi from <span className="text-accent">Alfarizi</span>, Front-end
            Developer and tryin to be Full Stack Developer
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            I design and code beautifully simple things and I love what I do. Just
            simple like that!
          </p>

          {/* Mask overlay: mewarnai konten di bawahnya dengan accent via blend-mode */}
          <motion.div
            className="absolute inset-0 mask-cursor"
            aria-hidden
            style={{
              ["--mask-x"]: `${localX}px`,
              ["--mask-y"]: `${localY}px`,
              ["--mask-size"]: maskSizePx,
            } as CSSProperties}
            animate={{ opacity: 0.9 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
          />

          {/* Overlay kedua: teks hitam hanya di area lingkaran */}
          <motion.div
            className="absolute inset-0 mask-cursor-text"
            aria-hidden
            style={{
              ["--mask-x"]: `${localX}px`,
              ["--mask-y"]: `${localY}px`,
              ["--mask-size"]: maskSizePx,
            } as CSSProperties}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
          >
            <div className="pointer-events-none text-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 md:mb-8 text-black">
                Say Hi from <span className="text-black">Alfarizi</span>, Front-end
                Developer and tryin to be Full Stack Developer
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-black">
                I design and code beautifully simple things and I love what I do. Just
                simple like that!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
