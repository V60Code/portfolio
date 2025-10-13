import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type AboutSectionProps = {
  isActive?: boolean;
};

const lineVariants: Variants = {
  initial: { y: "100%" },
  enter: (i: number) => ({
    y: "0%",
    transition: { duration: 0.75, ease: "easeInOut", delay: 0.1 * i },
  }),
};

export const AboutSection = ({ isActive = false }: AboutSectionProps) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (isActive && !hasPlayed) {
      setHasPlayed(true);
    }
  }, [isActive, hasPlayed]);

  const animateState = hasPlayed ? "enter" : "initial";

  return (
    <section id="about" data-scroll-section className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">ABOUT</span>
      </div>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12">
        <div className="overflow-hidden">
          <motion.span
            custom={0}
            variants={lineVariants}
            initial="initial"
            animate={animateState}
            className="block"
          >
            Every great product begin with an even
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="initial"
            animate={animateState}
            className="block"
          >
            <span className="text-accent">better story</span>
          </motion.span>
        </div>
      </h2>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="overflow-hidden">
            <motion.p
              custom={2}
              variants={lineVariants}
              initial="initial"
              animate={animateState}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Since beginning my journey as a developer, I've been passionate about creating digital solutions that
              make a difference. From mobile applications to web platforms, I focus on building products that are both
              functional and beautiful. I'm quietly confident, naturally curious, and perpetually working on improving
              my skills one project at a time.
            </motion.p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="overflow-hidden">
              <motion.div
                custom={3}
                variants={lineVariants}
                initial="initial"
                animate={animateState}
                className="text-3xl font-bold text-accent mb-2"
              >
                2+
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                custom={4}
                variants={lineVariants}
                initial="initial"
                animate={animateState}
                className="text-sm text-muted-foreground uppercase tracking-wider"
              >
                YEARS OF EXPERIENCE
              </motion.div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden">
              <motion.div
                custom={5}
                variants={lineVariants}
                initial="initial"
                animate={animateState}
                className="text-3xl font-bold text-accent mb-2"
              >
                15+
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                custom={6}
                variants={lineVariants}
                initial="initial"
                animate={animateState}
                className="text-sm text-muted-foreground uppercase tracking-wider"
              >
                PROJECTS COMPLETED
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
