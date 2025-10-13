import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
type ResumeSectionProps = {
  isActive?: boolean;
};

export const ResumeSection = ({ isActive = false }: ResumeSectionProps) => {
  type GroupKey = "education" | "professional" | "organization";
  type Experience = {
    period: string;
    position: string;
    company: string;
    description: string;
    category: GroupKey;
  };

  const experiences: Experience[] = [
    {
      period: "Aug 2025 - Nov 2025",
      position: "Web Developer Intern",
      company: "Wesclic Technology",
      description:
        "Contributed to web application features, code reviews, and agile workflows using modern stacks.",
      category: "professional",
    },
    {
      period: "Jan 2025 - May 2025",
      position: "Full Stack Web Development Cohort",
      company: "Coding Camp by DBS Foundation",
      description:
        "Intensive program focusing on web development fundamentals, data structures, and collaborative project building.",
      category: "professional",
    },
    {
      period: "Sep 2024 - Jan 2025",
      position: "Android Development Cohort",
      company: "Bangkit led by Google, GoTo, & Traveloka",
      description:
        "Focused on Android fundamentals, architecture patterns, and capstone implementation.",
      category: "professional",
    },
    {
      period: "Feb 2025 - May 2025",
      position: "Web Developer",
      company: "KKN 61 UIN Sunan Kalijaga 2025",
      description:
        "Create a livestock information system website using laravel and filament.",
      category: "professional",
    },
    {
      period: "Jan 2024 - Feb 2025",
      position: "Co-Lead",
      company: "Himpunan Mahasiswa Informatika UIN Sunan Kalijaga",
      description:
        "Coordinated initiatives, organized events, and supported team execution for academic programs.",
      category: "organization",
    },
    {
      period: "Feb 2024 - May 2025",
      position: "Leader",
      company: "Study Club Informatic of UIN Sunan Kalijaga",
      description:
        "Led technical projects and mentored peers through workshops and competitions.",
      category: "organization",
    },
    {
      period: "Aug 2024 - Oct 2024",
      position: "Teaching Assistant - Computer Security",
      company: "UIN Sunan Kalijaga",
      description:
        "Supported course delivery, assisted student learning, and evaluated assignments.",
      category: "education",
    },
    {
      period: "Aug 2022 - present",
      position: "Student",
      company: "UIN Sunan Kalijaga",
      description:
        "Supported course delivery, assisted student learning, and evaluated assignments.",
      category: "education",
    },
  ];

  const groups: {
    title: string;
    key: GroupKey;
  }[] = [
    { title: "Education & Academic Roles", key: "education" },
    { title: "Professional & Project Experience", key: "professional" },
    { title: "Organization", key: "organization" },
  ];

  const MONTHS: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const getEndDate = (period: string) => {
    const parts = period.split("-");
    const end = parts[1]?.trim();
    if (!end) return new Date(0);
    const [monthStr, yearStr] = end.split(" ").filter(Boolean);
    const month = MONTHS[monthStr as keyof typeof MONTHS] ?? 0;
    const year = parseInt(yearStr, 10) || 0;
    return new Date(year, month, 1);
  };

  const [hasPlayed, setHasPlayed] = useState(false);
  const [playedGroups, setPlayedGroups] = useState<Record<GroupKey, boolean>>({
    education: false,
    professional: false,
    organization: false,
  });
  useEffect(() => {
    if (isActive && !hasPlayed) {
      setHasPlayed(true);
    }
  }, [isActive, hasPlayed]);

  const animateState = hasPlayed ? "enter" : "initial";

  const lineVariants: Variants = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.75, ease: "easeInOut", delay: 0.075 * i },
    }),
  };

  const GroupBlock = ({
    group,
    items,
    hasPlayed,
    onPlayed,
  }: {
    group: { title: string; key: GroupKey };
    items: Experience[];
    hasPlayed: boolean;
    onPlayed: (key: GroupKey) => void;
  }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-50%" });
    useEffect(() => {
      if (inView && !hasPlayed) onPlayed(group.key);
    }, [inView, hasPlayed, group.key, onPlayed]);
    const initialTarget = hasPlayed ? false : "initial";
    const animateTarget = hasPlayed ? { y: "0%" } : "enter";

    return (
      <div ref={ref} className="resume-group">
        <div className="overflow-hidden">
          <motion.h3
            custom={0}
            variants={lineVariants}
            initial={initialTarget}
            animate={animateTarget}
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            {group.title}
          </motion.h3>
        </div>

        <div className="relative pl-8 space-y-12">
          <div className="absolute left-0 top-0 bottom-0 border-l-2 border-border"></div>
          {items.map((exp, index) => (
            <div key={`${group.key}-${index}`} className="relative pl-8">
              <div className="absolute top-0 -left-8 -translate-x-1/2 w-4 h-4 bg-accent rounded-full"></div>
              <div>
                <div className="overflow-hidden">
                  <motion.p
                    custom={1 + index * 4}
                    variants={lineVariants}
                    initial={initialTarget}
                    animate={animateTarget}
                    className="text-sm text-accent mb-2"
                  >
                    {exp.period}
                  </motion.p>
                </div>

                <div className="overflow-hidden">
                  <motion.p
                    custom={2 + index * 4}
                    variants={lineVariants}
                    initial={initialTarget}
                    animate={animateTarget}
                    className="text-xl font-bold mb-1"
                  >
                    {exp.position}
                  </motion.p>
                </div>

                <div className="overflow-hidden">
                  <motion.p
                    custom={3 + index * 4}
                    variants={lineVariants}
                    initial={initialTarget}
                    animate={animateTarget}
                    className="text-muted-foreground mb-3"
                  >
                    {exp.company}
                  </motion.p>
                </div>

                <div className="overflow-hidden">
                  <motion.p
                    custom={4 + index * 4}
                    variants={lineVariants}
                    initial={initialTarget}
                    animate={animateTarget}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {exp.description}
                  </motion.p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="resume"
      data-scroll-section
      className="section-min section-spacing"
    >
      <div className="mb-8">
        <span className="section-tag">Experience</span>
      </div>

      <div className="overflow-hidden mb-12">
        <motion.h2
          custom={0}
          variants={lineVariants}
          initial="initial"
          animate={animateState}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Experience
        </motion.h2>
      </div>

      {/* Vertical groups with per-group triggers */}
      <div className="space-y-24">
        {groups.map((group) => (
          <GroupBlock
            key={group.key}
            group={group}
            items={experiences
              .filter((exp) => exp.category === group.key)
              .sort(
                (a, b) =>
                  getEndDate(b.period).getTime() -
                  getEndDate(a.period).getTime()
              )}
            hasPlayed={playedGroups[group.key]}
            onPlayed={(key) =>
              setPlayedGroups((prev) =>
                prev[key]
                  ? prev
                  : {
                      ...prev,
                      [key]: true,
                    }
              )
            }
          />
        ))}
      </div>
    </section>
  );
};
