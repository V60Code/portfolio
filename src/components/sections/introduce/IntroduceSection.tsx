"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./IntroduceSection.module.scss";

export function IntroduceSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const paragraph =
    "I'm a selectively skilled product designer with strong focus on producing high quality & impactful digital experience.";
  const words = paragraph.split(" ");

  return (
    <section className={styles.main}>
      <p ref={container} className={styles.paragraph}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className={styles.word}>
      <span className={styles.shadow}>{children}</span>
      <motion.span
        className={styles.highlighted}
        style={{
          opacity: opacity,
          color: "#ffffff",
          textShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};