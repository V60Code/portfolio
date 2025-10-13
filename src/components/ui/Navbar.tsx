import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavbarProps {
  currentSection?: string;
}

export const Navbar = ({ currentSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // close handled by SheetClose in mobile menu
    }
  };

  const navigationItems = [
    { label: "Experience", id: "resume" },
    { label: "Portfolios", id: "portfolio" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled ? "bg-background/80 navbar-backdrop" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-16 py-4">
        <div className="flex items-center justify-between w-full max-w-full gap-2">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0 pr-2"
          >
            <h1 className="text-base sm:text-xl navbar-brand text-foreground truncate">
              Code by <span className="text-accent">Alfarizi</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center space-x-8"
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="navbar-link text-foreground hover:text-accent"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile Drawer */}
          <div className="md:hidden flex-shrink-0 ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:text-accent transition-colors" aria-label="Open menu">
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className="w-6 h-0.5 bg-current block mb-1.5" />
                    <span className="w-6 h-0.5 bg-current block mb-1.5" />
                    <span className="w-6 h-0.5 bg-current block" />
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-4">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left px-4 py-2 rounded-md border hover:bg-surface-elevated text-foreground hover:text-accent transition-colors"
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};