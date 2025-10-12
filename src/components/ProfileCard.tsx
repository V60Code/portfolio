import { Github, Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import profileImage from "@/assets/profile.png";
import { useIsMobile } from "@/hooks/use-mobile";

export const ProfileCard = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`profile-card w-full ${isMobile ? "" : "max-w-xs"}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">ALFARIZI</h1>
        <p className="text-muted-foreground text-sm">
          Full-stack Developer & Android Developer
        </p>
      </div>

      {/* Profile Image */}
      <div className="relative mb-6">
        <img
          src={profileImage}
          alt="Muhammad Alfarizi Habibullah"
          className="w-full max-w-[200px] aspect-square mx-auto object-cover rounded-xl"
        />
      </div>

      {/* Contact Info */}
      <div className="text-center space-y-3 mb-6">
        <p className="text-sm">m.alfarizihabibullah@gmail.com</p>
        <p className="text-sm text-muted-foreground">Base in Yogyakarta, ID</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-3 mb-6">
        <a
          href="https://www.linkedin.com/in/m-alfarizi-habibullah/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://github.com/V60Code"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.instagram.com/alfarizi_habibullah/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Instagram size={18} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Youtube size={18} />
        </a>
        <a
          href="mailto:m.alfarizihabibullah@gmail.com"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <Mail size={18} />
        </a>
      </div>

      {/* CTA Button */}
      <button className="btn-primary w-full mb-6">WORK WITH ME</button>

      {/* Copyright */}
      <p className="text-xs text-muted-foreground text-center">
        © 2025 Alfarizi Habibullah. All Rights Reserved
      </p>
    </div>
  );
};
