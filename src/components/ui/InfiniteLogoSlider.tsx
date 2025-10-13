import { useRef, useEffect, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Static logo source list (module-level constant)
const LOGOS: { name: string; url: string }[] = [
  {
    name: "React.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "PHP",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "Laravel",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "Bootstrap",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "HTML",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "Android Studio",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
  },
  {
    name: "Kotlin",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Vite",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "FilamentPHP",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/filamentphp/filamentphp-original.svg",
  },
  {
    name: "Github",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Postman",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  },
  {
    name: "SQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "TailwindCSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "Vercel",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  },
  {
    name: "Vue.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "WordPress",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",
  },
  {
    name: "VSCode",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
];

const InfiniteLogoSlider = () => {
  const firstBottom = useRef<HTMLDivElement>(null);
  const secondBottom = useRef<HTMLDivElement>(null);
  const sliderBottom = useRef<HTMLDivElement>(null);

  const firstTop = useRef<HTMLDivElement>(null);
  const secondTop = useRef<HTMLDivElement>(null);
  const sliderTop = useRef<HTMLDivElement>(null);

  // additional two rows above (reverse then normal)
  const firstUpperRev = useRef<HTMLDivElement>(null);
  const secondUpperRev = useRef<HTMLDivElement>(null);
  const sliderUpperRev = useRef<HTMLDivElement>(null);

  const firstUpperNorm = useRef<HTMLDivElement>(null);
  const secondUpperNorm = useRef<HTMLDivElement>(null);
  const sliderUpperNorm = useRef<HTMLDivElement>(null);

  // top-most normal row
  const firstTopMostNorm = useRef<HTMLDivElement>(null);
  const secondTopMostNorm = useRef<HTMLDivElement>(null);
  const sliderTopMostNorm = useRef<HTMLDivElement>(null);

  // top-most reverse row (new)
  const firstTopMostRev = useRef<HTMLDivElement>(null);
  const secondTopMostRev = useRef<HTMLDivElement>(null);
  const sliderTopMostRev = useRef<HTMLDivElement>(null);

  const xPercentBottom = useRef(0);
  const xPercentTop = useRef(0);
  const xPercentUpperRev = useRef(0);
  const xPercentUpperNorm = useRef(0);
  const xPercentTopMostNorm = useRef(0);
  const xPercentTopMostRev = useRef(0);

  // distinct speeds per row (tweak for parallax feel)
  const SPEED_BOTTOM_NORM = 0.05; // bottom normal
  const SPEED_TOP_REV = 0.09; // row 3 reverse
  const SPEED_UPPER_NORM = 0.1; // row 2 normal
  const SPEED_UPPER_REV = 0.08; // row 1 reverse
  const SPEED_TOPMOST_NORM = 0.02; // topmost normal
  const SPEED_TOPMOST_REV = 0.04; // topmost reverse
  const directionRef = useRef(-1);
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    // wrap logic for bottom row
    if (xPercentBottom.current < -100) {
      xPercentBottom.current = 0;
    } else if (xPercentBottom.current > 0) {
      xPercentBottom.current = -100;
    }

    // wrap logic for top row
    if (xPercentTop.current < -100) {
      xPercentTop.current = 0;
    } else if (xPercentTop.current > 0) {
      xPercentTop.current = -100;
    }

    // wrap logic for upper reverse row
    if (xPercentUpperRev.current < -100) {
      xPercentUpperRev.current = 0;
    } else if (xPercentUpperRev.current > 0) {
      xPercentUpperRev.current = -100;
    }

    // wrap logic for upper normal row
    if (xPercentUpperNorm.current < -100) {
      xPercentUpperNorm.current = 0;
    } else if (xPercentUpperNorm.current > 0) {
      xPercentUpperNorm.current = -100;
    }

    // wrap logic for top-most normal row
    if (xPercentTopMostNorm.current < -100) {
      xPercentTopMostNorm.current = 0;
    } else if (xPercentTopMostNorm.current > 0) {
      xPercentTopMostNorm.current = -100;
    }

    // wrap logic for top-most reverse row
    if (xPercentTopMostRev.current < -100) {
      xPercentTopMostRev.current = 0;
    } else if (xPercentTopMostRev.current > 0) {
      xPercentTopMostRev.current = -100;
    }

    // apply position for bottom row
    if (firstBottom.current && secondBottom.current) {
      gsap.set(firstBottom.current, { xPercent: xPercentBottom.current });
      gsap.set(secondBottom.current, { xPercent: xPercentBottom.current });
    }

    // apply position for top row (reverse direction)
    if (firstTop.current && secondTop.current) {
      gsap.set(firstTop.current, { xPercent: xPercentTop.current });
      gsap.set(secondTop.current, { xPercent: xPercentTop.current });
    }

    // apply position for upper reverse row
    if (firstUpperRev.current && secondUpperRev.current) {
      gsap.set(firstUpperRev.current, { xPercent: xPercentUpperRev.current });
      gsap.set(secondUpperRev.current, { xPercent: xPercentUpperRev.current });
    }

    // apply position for upper normal row
    if (firstUpperNorm.current && secondUpperNorm.current) {
      gsap.set(firstUpperNorm.current, { xPercent: xPercentUpperNorm.current });
      gsap.set(secondUpperNorm.current, { xPercent: xPercentUpperNorm.current });
    }

    // apply position for top-most normal row
    if (firstTopMostNorm.current && secondTopMostNorm.current) {
      gsap.set(firstTopMostNorm.current, { xPercent: xPercentTopMostNorm.current });
      gsap.set(secondTopMostNorm.current, { xPercent: xPercentTopMostNorm.current });
    }

    // apply position for top-most reverse row
    if (firstTopMostRev.current && secondTopMostRev.current) {
      gsap.set(firstTopMostRev.current, { xPercent: xPercentTopMostRev.current });
      gsap.set(secondTopMostRev.current, { xPercent: xPercentTopMostRev.current });
    }

    rafId.current = requestAnimationFrame(animate);
    // bottom follows scroll direction (normal)
    xPercentBottom.current += SPEED_BOTTOM_NORM * directionRef.current;
    // row 3 (reverse)
    xPercentTop.current += SPEED_TOP_REV * -directionRef.current;
    // row 1 (reverse)
    xPercentUpperRev.current += SPEED_UPPER_REV * -directionRef.current;
    // row 2 (normal)
    xPercentUpperNorm.current += SPEED_UPPER_NORM * directionRef.current;
    // top-most normal
    xPercentTopMostNorm.current += SPEED_TOPMOST_NORM * directionRef.current;
    // top-most reverse
    xPercentTopMostRev.current += SPEED_TOPMOST_REV * -directionRef.current;
  }, []);

  // randomized logos per row (stable per mount)
  const logosTopMostRev = useMemo(() => shuffle(LOGOS), []);
  const logosTopMostNorm = useMemo(() => shuffle(LOGOS), []);
  const logosUpperRev = useMemo(() => shuffle(LOGOS), []);
  const logosUpperNorm = useMemo(() => shuffle(LOGOS), []);
  const logosTop = useMemo(() => shuffle(LOGOS), []);
  const logosBottom = useMemo(() => shuffle(LOGOS), []);

  // util: Fisher-Yates shuffle, returns a new array
  function shuffle<T>(array: T[]): T[] {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // (moved above)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial position for duplicate rows
    if (secondBottom.current && firstBottom.current) {
      gsap.set(secondBottom.current, {
        left: firstBottom.current.getBoundingClientRect().width,
      });
    }
    if (secondTop.current && firstTop.current) {
      gsap.set(secondTop.current, {
        left: firstTop.current.getBoundingClientRect().width,
      });
    }
    if (secondUpperRev.current && firstUpperRev.current) {
      gsap.set(secondUpperRev.current, {
        left: firstUpperRev.current.getBoundingClientRect().width,
      });
    }
    if (secondUpperNorm.current && firstUpperNorm.current) {
      gsap.set(secondUpperNorm.current, {
        left: firstUpperNorm.current.getBoundingClientRect().width,
      });
    }
    if (secondTopMostNorm.current && firstTopMostNorm.current) {
      gsap.set(secondTopMostNorm.current, {
        left: firstTopMostNorm.current.getBoundingClientRect().width,
      });
    }
    if (secondTopMostRev.current && firstTopMostRev.current) {
      gsap.set(secondTopMostRev.current, {
        left: firstTopMostRev.current.getBoundingClientRect().width,
      });
    }

    // ScrollTrigger: update direction based on scroll
    const tween = gsap.to(sliderBottom.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          directionRef.current = e.direction * -1;
        },
      },
      x: "-300px",
    });

    // Start animation
    rafId.current = requestAnimationFrame(animate);

    // Cleanup: cancel RAF and kill GSAP ScrollTrigger
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      // Kill tween and its ScrollTrigger to prevent leaks
      // Optional chaining for safety if plugin not attached
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [animate]);

  

  const LogoRow = ({ logos }: { logos: { name: string; url: string }[] }) => (
    <div className="flex items-center gap-[64px] px-[64px] whitespace-nowrap">
      {logos.map((logo, index) => (
        <div key={index} className="flex items-center">
          <img
            src={logo.url}
            alt={logo.name}
            className="w-[100px] h-[100px] shrink-0 object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6">
      <div className="flex flex-col gap-4">
        {/* Row -1: reverse (new topmost) */}
        <div
          ref={sliderTopMostRev}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstTopMostRev} className="relative">
            <LogoRow logos={logosTopMostRev} />
          </div>
          <div ref={secondTopMostRev} className="absolute top-0">
            <LogoRow logos={logosTopMostRev} />
          </div>
        </div>

        {/* Row 0: normal */}
        <div
          ref={sliderTopMostNorm}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstTopMostNorm} className="relative">
            <LogoRow logos={logosTopMostNorm} />
          </div>
          <div ref={secondTopMostNorm} className="absolute top-0">
            <LogoRow logos={logosTopMostNorm} />
          </div>
        </div>

        {/* Row 1: reverse */}
        <div
          ref={sliderUpperRev}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstUpperRev} className="relative">
            <LogoRow logos={logosUpperRev} />
          </div>
          <div ref={secondUpperRev} className="absolute top-0">
            <LogoRow logos={logosUpperRev} />
          </div>
        </div>

        {/* Row 2: normal */}
        <div
          ref={sliderUpperNorm}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstUpperNorm} className="relative">
            <LogoRow logos={logosUpperNorm} />
          </div>
          <div ref={secondUpperNorm} className="absolute top-0">
            <LogoRow logos={logosUpperNorm} />
          </div>
        </div>

        {/* Row 3: reverse */}
        <div
          ref={sliderTop}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstTop} className="relative">
            <LogoRow logos={logosTop} />
          </div>
          <div ref={secondTop} className="absolute top-0">
            <LogoRow logos={logosTop} />
          </div>
        </div>

        {/* Row 4: normal (bottom) */}
        <div
          ref={sliderBottom}
          className="relative flex items-center min-w-0"
          style={{ width: "200%" }}
        >
          <div ref={firstBottom} className="relative">
            <LogoRow logos={logosBottom} />
          </div>
          <div ref={secondBottom} className="absolute top-0">
            <LogoRow logos={logosBottom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteLogoSlider;
