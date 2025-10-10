import { Home, User, Briefcase, Award, Settings, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "introduce", icon: Home, label: "Introduce" },
  { id: "about", icon: User, label: "About" },
  { id: "resume", icon: Briefcase, label: "Resume" },
  { id: "skills", icon: Award, label: "Skills" },
  { id: "portfolio", icon: Settings, label: "Portfolio" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile Navigation - Bottom positioned with glass effect, matching ProfileCard width
    return (
      <div className="fixed bottom-4 left-8 right-8 z-50">
        <div className="bg-background/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/20">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl"></div>
          <div className="relative flex justify-center items-center px-4 py-3">
            <div className="flex space-x-3 w-full justify-between">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="group relative flex items-center justify-center"
                  title={item.label}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-accent/90 text-accent-foreground shadow-lg backdrop-blur-sm' 
                      : 'text-muted-foreground hover:text-accent hover:bg-white/10 hover:backdrop-blur-sm'
                  }`}>
                    <item.icon size={18} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Navigation - Right side positioned
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      {/* Navigation Dots */}
      <div className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className="group relative flex items-center"
            title={item.label}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              activeSection === item.id 
                ? 'bg-accent text-accent-foreground' 
                : 'border border-border hover:border-accent hover:text-accent'
            }`}>
              <item.icon size={16} />
            </div>
            {activeSection === item.id && (
              <div className="absolute right-12 bg-surface-elevated px-3 py-1 rounded-full border border-border">
                <span className="text-xs text-accent uppercase">{item.label}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};