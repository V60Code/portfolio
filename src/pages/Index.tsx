import { useState, useEffect, useRef } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { Navigation } from "@/components/Navigation";
import { IntroduceSection } from "@/components/sections/IntroduceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useIsMobile } from "@/hooks/use-mobile";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const Index = () => {
  const [activeSection, setActiveSection] = useState("introduce");
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const locoRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    let lastScroll = 0;
    const locoScroll = new LocomotiveScroll({
      // lenis-based smooth scroll options
      lenisOptions: {
        lerp: 0.1,
      },
      autoStart: true,
      scrollCallback: (values) => {
        lastScroll = values.scroll;
        ScrollTrigger.update();
      },
    });
    locoRef.current = locoScroll;

    // Ensure RAF is running (v5 uses Lenis under the hood)
    locoScroll.start();

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (!locoRef.current) return 0;
        if (value !== undefined) {
          locoRef.current.scrollTo(value, { duration: 0, immediate: true });
          return 0;
        }
        return lastScroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: (container as HTMLElement).style.transform ? "transform" : "fixed",
    });

    const refreshHandler = () => locoScroll.resize();
    ScrollTrigger.addEventListener("refresh", refreshHandler);
    ScrollTrigger.refresh();

    const sections = ["introduce", "about", "resume", "skills", "portfolio", "contact"];
    const triggers = sections.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        scroller: container,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", refreshHandler);
      locoScroll.destroy();
    };
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const selector = `#${sectionId}`;
    if (locoRef.current) {
      locoRef.current.scrollTo(selector, { duration: 1 });
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Profile Card - Fixed Left for Desktop */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <ProfileCard />
      </div>

      {/* Navigation - Fixed Right */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content */}
      <div ref={containerRef} data-scroll-container className={`lg:ml-80 lg:mr-32 px-8 lg:px-16 ${isMobile ? 'pb-20' : ''}`}>
        {/* Profile Card - Top position for Mobile */}
        {isMobile && (
          <div className="mb-8 pt-8">
            <ProfileCard />
          </div>
        )}
        
        <IntroduceSection />
        <AboutSection />
        <ResumeSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </div>


    </div>
  );
};

export default Index;