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
    <div className={`space-y-4 ${className || ""}`}>
      <div className="embla overscroll-none touch-pan-x overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex -ml-4 md:-ml-6">
          {slides.map((slide, idx) => (
            <div key={idx} className="embla__slide min-w-0 flex-[0_0_100%] pl-4 md:pl-6">
              <div className="rounded-lg overflow-hidden">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center py-2">
        {slides.map((_, idx) => {
          const isActive = selectedIndex === idx;
          return (
            <button
              key={`indicator-${idx}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-base-300 hover:bg-base-200"}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Ke slide ${idx + 1}`}
            >
              {/* dot */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;