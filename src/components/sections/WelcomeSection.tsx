import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgIntroduce from "@/assets/bg-introduce.png";

export const WelcomeSection = () => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }

    if (slider.current) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.5,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (direction = e.direction * -1),
        },
        x: "-500px",
      });
    }

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
    }

    requestAnimationFrame(animate);
    xPercent += 0.02 * direction;
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden min-w-0"
      style={{
        backgroundImage: `url(${bgIntroduce})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-start items-center pt-16 md:pt-20">
        {/* Name Text */}
        <div className="flex items-baseline justify-center mb-8 z-10 gap-4">
          <p className="text-white text-lg">hi, I'm</p>
          <h1 className="text-accent text-6xl md:text-[7.5rem] font-bold">
            Alfarizi
          </h1>
        </div>

        {/* Infinite Scrolling Text */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
          <div ref={slider} className="relative whitespace-nowrap">
            <p
              ref={firstText}
              className="text-white text-6xl md:text-8xl font-bold inline-block pr-8"
            >
              Frontend Developer -
            </p>
            <p
              ref={secondText}
              className="text-white text-6xl md:text-8xl font-bold inline-block pr-8 absolute top-0"
            >
              Frontend Developer -
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
