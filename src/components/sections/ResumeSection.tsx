export const ResumeSection = () => {
  const experiences = [
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
    key: "education" | "professional" | "organization";
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

  return (
    <section
      id="resume"
      data-scroll-section
      className="section-min section-spacing"
    >
      <div className="mb-8">
        <span className="section-tag">Experience</span>
      </div>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        Experience
      </h2>

      <div className="space-y-20">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8">
              {group.title}
            </h3>
            <div className="space-y-12">
              {experiences
                .filter((exp) => exp.category === group.key)
                .sort(
                  (a, b) =>
                    getEndDate(b.period).getTime() -
                    getEndDate(a.period).getTime()
                )
                .map((exp, index) => (
                  <div
                    key={`${group.key}-${index}`}
                    className="border-l-2 border-border pl-8"
                  >
                    <div className="relative">
                      <div className="absolute -left-10 w-4 h-4 bg-accent rounded-full"></div>
                      <p className="text-sm text-accent mb-2">{exp.period}</p>
                      <p className="text-xl font-bold mb-1">{exp.position}</p>
                      <p className="text-muted-foreground mb-3">
                        {exp.company}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
