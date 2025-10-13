import kucingImage from "@/assets/kucing.png";
import InfiniteLogoSlider from "@/components/ui/InfiniteLogoSlider";

export const WelcomeSection = () => {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden min-w-0"
      style={{ backgroundColor: "#999d9e" }}
    >
      {/* Content Container with consistent padding */}
      <div className="px-8 lg:px-16 min-h-screen flex items-end justify-center overflow-x-hidden min-w-0">
        {/* Cat Image - Centered horizontally and at bottom */}
        <div className="relative z-10 flex justify-center">
          <img
            src={kucingImage}
            alt="Welcome Cat"
            className="max-w-2xl max-h-screen object-contain"
          />
        </div>
      </div>

      {/* Infinite Logo Slider at bottom */}
      <InfiniteLogoSlider />
    </section>
  );
};
