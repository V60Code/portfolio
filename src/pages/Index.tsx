import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { Navigation } from "@/components/Navigation";
import { IntroduceSection } from "@/components/sections/IntroduceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("introduce");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduce", "about", "resume", "skills", "portfolio", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
      <div className={`lg:ml-80 lg:mr-32 px-8 lg:px-16 ${isMobile ? 'pb-20' : ''}`}>
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