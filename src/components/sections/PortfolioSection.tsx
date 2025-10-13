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
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Modal from "@/components/daisy/Modal";
import DaisyCarousel from "@/components/daisy/Carousel";

type Project = {
  title: string;
  description: string;
  images: string[];
  link: string;
  color: string;
};

const projects: Project[] = [
  {
    title: "UsStuck",
    description:
      "an AI platform that helps young Gen-Z Muslims who are embarrassed to ask questions directly to religious teachers",
    images: [usstuck1, usstuck2, usstuck3],
    link: "https://usstuck.netlify.app/",
    color: "#BBACAF",
  },
  {
    title: "Harumnesia",
    description:
      "Recommendation system and similarity to perfume to encourage Indonesian perfume MSMEs",
    images: [harumnesia1, harumnesia2, harumnesia3],
    link: "https://drive.google.com/file/d/1QtzapB7_6dPWuX6hfRlYhgbdod95PWao/view?usp=sharing",
    color: "#977F6D",
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
      color: "#C2491D",
    },
  ];

// Card component with parallax effect
const Card = ({ project, index, openProject }: { project: Project; index: number; openProject: (project: Project) => void }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  // Terapkan efek sticky dan perhitungan posisi hanya pada layar md+
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(min-width: 768px)");
      const update = () => setIsMd(mql.matches);
      update();
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
  }, []);

  return (
    <div ref={container} className="md:h-screen h-auto flex items-center justify-center md:sticky md:top-0">
      <motion.div 
        className="flex flex-col md:flex-row relative md:h-[500px] h-auto w-full max-w-6xl mx-4 sm:mx-6 md:mx-8 rounded-3xl p-6 md:p-12 cursor-pointer origin-top"
        style={{ 
          backgroundColor: project.color, 
          scale,
          top: isMd ? `calc(-5vh + ${index * 25}px)` : undefined
        }}
        onClick={() => openProject(project)}
      >
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-black">
            {project.title}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-black/80 max-w-md">
              {project.description}
            </p>
            <div className="flex items-center gap-2 text-black hover:text-black/80 transition-colors">
              <span className="text-sm font-medium">See more</span>
              <svg 
                className="w-5 h-3" 
                viewBox="0 0 22 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" 
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="flex-shrink-0 relative w-full md:w-96 h-64 md:h-80">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <motion.img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ scale: imageScale }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="portfolio" className="relative overflow-x-hidden min-w-0">
      <div className="py-20 px-8 lg:px-16">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16 text-center">
          Featured Portfolios
        </h2>
      </div>
      
      {projects.map((project, index) => (
        <Card 
          key={index} 
          project={project} 
          index={index} 
          openProject={openProject}
        />
      ))}

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
