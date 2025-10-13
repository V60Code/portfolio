import usstuck1 from "@/assets/usstuck1.jpg";
import usstuck2 from "@/assets/usstuck2.jpg";
import usstuck3 from "@/assets/usstuck3.jpg";
import harumnesia1 from "@/assets/harumnesia1.jpg";
import harumnesia2 from "@/assets/harumnesia2.jpg";
import harumnesia3 from "@/assets/harumnesia3.jpg";
import sipKarangnongko1 from "@/assets/sip_karangnongko1.jpg";
import sipKarangnongko2 from "@/assets/sip_karangnongko2.jpeg";
import sipKarangnongko3 from "@/assets/sip_karangnongko3.jpeg";
import sipKarangnongko4 from "@/assets/sip_karangnongko4.jpeg";
// External link icon dihilangkan sesuai permintaan
import { useState } from "react";
import Modal from "@/components/daisy/Modal";
import DaisyCarousel from "@/components/daisy/Carousel";

export const PortfolioSection = () => {
  type Project = {
    title: string;
    description: string;
    images: string[];
    link: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "UsStuck",
      description:
        "an AI platform that helps young Gen-Z Muslims who are embarrassed to ask questions directly to religious teachers",
      images: [usstuck1, usstuck2, usstuck3],
      link: "https://usstuck.netlify.app/",
    },
    {
      title: "Harumnesia",
      description:
        "Recommendation system and similarity to perfume to encourage Indonesian perfume MSMEs",
      images: [harumnesia1, harumnesia2, harumnesia3],
      link: "https://drive.google.com/file/d/1QtzapB7_6dPWuX6hfRlYhgbdod95PWao/view?usp=sharing",
    },
    {
      title: "SIP-karangnongko",
      description:
        "Goat farming information system for Karangnongko village to facilitate monitoring of goats and breeders",
      images: [
        sipKarangnongko1,
        sipKarangnongko2,
        sipKarangnongko3,
        sipKarangnongko4,
      ],
      link: "https://farm.ppmcal.com/",
    },
  ];

  const openProject = (project: Project) => setSelectedProject(project);
  const handleKeyOpen = (
    e: React.KeyboardEvent<HTMLDivElement>,
    project: Project
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <section
      id="portfolio"
      data-scroll-section
      className="section-min section-spacing"
    >
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
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105 origin-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
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
              slides={selectedProject.images.map((src, i) => (
                <div key={i}>
                  <img
                    src={src}
                    alt={`Gambar ${i + 1} proyek ${selectedProject.title}`}
                    className={`w-full aspect-video object-cover ${
                      i === 0 ? "object-center" : "object-top"
                    }`}
                  />
                </div>
              ))}
            />

            <div className="mt-4 flex items-center gap-3">
              {selectedProject?.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
