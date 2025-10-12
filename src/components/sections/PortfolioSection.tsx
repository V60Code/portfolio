import seefudImage from "@/assets/seefud-project.jpg";
import harumnesiaImage from "@/assets/harumnesia-project.jpg";
import sipKarangnongkoImage from "@/assets/sip-karangnongko-project.jpg";
// External link icon dihilangkan sesuai permintaan
import { useState } from "react";
import Modal from "@/components/daisy/Modal";
import DaisyCarousel from "@/components/daisy/Carousel";

export const PortfolioSection = () => {
  type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
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

  const openProject = (project: Project) => setSelectedProject(project);
  const handleKeyOpen = (e: React.KeyboardEvent<HTMLDivElement>, project: Project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <section id="portfolio" data-scroll-section className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">PORTFOLIO</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        Featured Portfolios
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Buka detail proyek ${project.title}`}
            onClick={() => openProject(project)}
            onKeyDown={(e) => handleKeyOpen(e, project)}
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal detail proyek - DaisyUI */}
      <Modal
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
        title={selectedProject?.title}
        description={selectedProject?.description}
      >
        {selectedProject && (
          <div>
            <DaisyCarousel
              className="mt-4"
              slides={[0,1,2].map((i) => (
                <img
                  key={i}
                  src={selectedProject.image}
                  alt={`Gambar ${i+1} proyek ${selectedProject.title}`}
                  className="w-full aspect-video object-cover"
                />
              ))}
            />

            <div className="mt-4 flex items-center gap-3">
              <button
                className="btn bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  if (selectedProject?.link) {
                    window.open(selectedProject.link, "_blank");
                  }
                }}
              >
                Kunjungi Proyek
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};