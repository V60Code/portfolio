import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

type CarouselProps = {
  slides: React.ReactNode[];
  className?: string;
};

export const Carousel: React.FC<CarouselProps> = ({ slides, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [WheelGesturesPlugin({ forceWheelAxis: 'x' })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);

  return (
    <div className={`space-y-3 ${className || ""}`}>
      <div className="embla overscroll-none touch-pan-x" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, idx) => (
            <div key={idx} className="embla__slide min-w-0 flex-[0_0_100%]">
              <div className="rounded-lg overflow-hidden">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 justify-center">
        {slides.map((_, idx) => {
          const isActive = selectedIndex === idx;
          return (
            <button
              key={`indicator-${idx}`}
              className={`btn btn-ghost btn-xs ${isActive ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Ke slide ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;