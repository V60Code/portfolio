import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experienceCards } from "../../../data/ExperienceData";

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2 + index * 0.1,
      },
    }),
  };

  // Get data for each category
  const educationData = experienceCards.find(card => card.key === "education");
  const organizationData = experienceCards.find(card => card.key === "organization");
  const professionalData = experienceCards.find(card => card.key === "professional");

  return (
    <section
      ref={sectionRef}
      className="relative bg-black px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
          {/* Experience Card - Large (spans 2 columns on lg screens) */}
          <motion.div
            className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 md:p-8 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="mb-6">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  variants={titleVariants}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  Experience
                </motion.h1>
              </div>
              <motion.p
                className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
                variants={titleVariants}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2,
                }}
              >
                some notes on my life journey in searching for my identity in the
                world of computer science
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Professional Card - Large (spans 2 rows on lg screens) */}
          <motion.div
            className="lg:row-span-2 bg-purple-900/30 rounded-2xl p-6 md:p-8 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3}
          >
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">professional</h2>
            </div>
            <div className="space-y-4">
              {professionalData?.items.slice(0, 2).map((item, index) => (
                <div key={index}>
                  <div className="text-gray-400 text-xs mb-1">{item.period}</div>
                  <h3 className="text-orange-500 font-semibold text-sm md:text-base mb-1">
                    {item.position}
                  </h3>
                  <div className="text-gray-300 text-xs md:text-sm mb-2">{item.company}</div>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              ))}
              {professionalData && professionalData.items.length > 2 && (
                <div className="text-gray-500 text-xs">
                  +{professionalData.items.length - 2} more experiences
                </div>
              )}
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="bg-blue-900/30 rounded-2xl p-6 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
          >
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">education</h2>
            </div>
            <div className="space-y-4">
              {educationData?.items.map((item, index) => (
                <div key={index}>
                  <div className="text-gray-400 text-xs mb-1">{item.period}</div>
                  <h3 className="text-orange-500 font-semibold text-sm mb-1">
                    {item.position}
                  </h3>
                  <div className="text-gray-300 text-xs mb-2">{item.company}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Organization Card */}
          <motion.div
            className="bg-green-900/30 rounded-2xl p-6 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
          >
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">organization</h2>
            </div>
            <div className="space-y-4">
              {organizationData?.items.map((item, index) => (
                <div key={index}>
                  <div className="text-gray-400 text-xs mb-1">{item.period}</div>
                  <h3 className="text-orange-500 font-semibold text-sm mb-1">
                    {item.position}
                  </h3>
                  <div className="text-gray-300 text-xs mb-2">{item.company}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
