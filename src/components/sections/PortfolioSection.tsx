import seefudImage from "@/assets/seefud-project.jpg";
import harumnesiaImage from "@/assets/harumnesia-project.jpg";
import sipKarangnongkoImage from "@/assets/sip-karangnongko-project.jpg";
import { ExternalLink } from "lucide-react";

export const PortfolioSection = () => {
  const projects = [
    {
      title: "Seefud",
      description: "Mobile app Food delivery and restaurant management platform with modern UI/UX design and real-time order tracking.",
      image: seefudImage,
      link: "#"
    },
    {
      title: "Harumnesia", 
      description: "Recommendation system and similarity to perfume to encourage Indonesian perfume MSMEs",
      image: harumnesiaImage,
      link: "#"
    },
    {
      title: "SIP-karangnongko",
      description: "Goat farming information system for Karangnongko village to facilitate monitoring of goats and breeders",
      image: sipKarangnongkoImage,
      link: "#"
    }
  ];

  return (
    <section id="portfolio" className="min-h-screen py-20">
      <div className="mb-8">
        <span className="section-tag">PORTFOLIO</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        Featured Portfolios
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="project-card group">
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <a
                href={project.link}
                className="absolute top-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};