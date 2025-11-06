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
import CardParallax from "@/components/parallax/CardParallax";

type Project = {
  title: string;
  description: string;
  src: string;
  images: string[];
  link: string;
  color: string;
};

const projects: Project[] = [
  {
    title: "UsStuck",
    description:
      "an AI platform that helps young Gen-Z Muslims who are embarrassed to ask questions directly to religious teachers",
    src: usstuck1,
    images: [usstuck1, usstuck2, usstuck3],
    link: "https://usstuck.netlify.app/",
    color: "#BBACAF",
  },
  {
    title: "Harumnesia",
    description:
      "Recommendation system and similarity to perfume to encourage Indonesian perfume MSMEs",
    src: harumnesia1,
    images: [harumnesia1, harumnesia2, harumnesia3],
    link: "https://drive.google.com/file/d/1QtzapB7_6dPWuX6hfRlYhgbdod95PWao/view?usp=sharing",
    color: "#977F6D",
  },
  {
    title: "SIP-karangnongko",
    description:
      "Goat farming information system for Karangnongko village to facilitate monitoring of goats and breeders",
    src: sipKarangnongko1,
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

export const PortfolioSection = () => {
  return (
    <section id="portfolio" data-scroll-section className="relative bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="py-20">
          <h1 className="text-white text-4xl md:text-6xl font-light mb-16 text-center">Portfolio</h1>
          {/* Parallax stacked cards */}
          <div>
            {projects.map((project, i) => (
              <CardParallax
                key={`p_${i}`}
                title={project.title}
                description={project.description}
                src={project.src}
                color={project.color}
                link={project.link}
                i={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
