import React from "react";
import { motion } from "framer-motion";

export interface ExperienceItem {
  period: string;
  position: string;
  company: string;
  description: string;
}

interface ExperienceListProps {
  items: ExperienceItem[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ items }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative flex items-start space-x-3 sm:space-x-4"
        >
          {/* Timeline dot */}
          <div className="flex-shrink-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2 relative"></div>

          {/* Content */}
          <div className="flex-1 pb-6 sm:pb-8">
            <div className="text-gray-400 text-xs sm:text-sm mb-1">
              {item.period}
            </div>
            <h3 className="text-orange-500 text-lg sm:text-xl font-semibold mb-1 leading-tight">
              {item.position}
            </h3>
            <div className="text-gray-300 text-sm sm:text-base mb-2">
              {item.company}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceList;
