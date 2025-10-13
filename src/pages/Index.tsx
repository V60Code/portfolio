import { useState, useEffect, useRef } from "react";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { IntroduceSection } from "@/components/sections/IntroduceSection";

import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import GlobalCursor from "@/components/ui/GlobalCursor";
import { Navbar } from "@/components/ui/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useActiveSection } from "@/hooks/useActiveSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const Index = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeSection = useActiveSection();
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
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (container as HTMLElement).style.transform
        ? "transform"
        : "fixed",
    });

    const refreshHandler = () => locoScroll.resize();
    // Pause/resume smooth scrolling when modal requests scroll lock
    const onScrollLock = (e: Event) => {
      const detail = (e as CustomEvent<{ locked: boolean }>).detail;
      const locked = detail?.locked ?? false;
      if (locked) {
        locoScroll.stop();
      } else {
        locoScroll.start();
      }
    };
    window.addEventListener("app:scroll-lock", onScrollLock as EventListener);
    ScrollTrigger.addEventListener("refresh", refreshHandler);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", refreshHandler);
      window.removeEventListener(
        "app:scroll-lock",
        onScrollLock as EventListener
      );
      locoScroll.destroy();
    };
  }, []);



  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden min-w-0">
      <GlobalCursor />
      <Navbar currentSection={activeSection} />

      {/* Main Content */}
      <div
        ref={containerRef}
        data-scroll-container
        className={`${isMobile ? "pb-20" : ""} overflow-x-hidden min-w-0`}
      >
        <div id="welcome">
          <WelcomeSection />
        </div>
        <div id="introduce">
          <IntroduceSection />
        </div>
        <div className="px-8 lg:px-16">
          <div id="resume">
            <ResumeSection />
          </div>
          <div id="skills">
            <SkillsSection />
          </div>
          <div id="portfolio">
            <PortfolioSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
