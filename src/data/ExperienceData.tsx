export type ExperienceItem = {
  period: string;
  position: string;
  company: string;
  description: string;
};

export type ExperienceCardData = {
  key: "education" | "organization" | "professional";
  title: string;
  color: string; // Tailwind classes or hex color
  items: ExperienceItem[];
};

export const experienceCards: ExperienceCardData[] = [
  {
    key: "education",
    title: "Education",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    items: [
      {
        period: "Aug 2024 - Oct 2024",
        position: "Teaching Assistant - Computer Security",
        company: "UIN Sunan Kalijaga",
        description:
          "Supported course delivery, assisted student learning, and evaluated assignments.",
      },
      {
        period: "Aug 2022 - present",
        position: "Student",
        company: "UIN Sunan Kalijaga",
        description:
          "Pursuing Bachelor's degree in Informatics Engineering with focus on software development and computer science fundamentals.",
      },
    ],
  },
  {
    key: "organization",
    title: "Organization",
    color: "bg-gradient-to-br from-green-600 to-green-800",
    items: [
      {
        period: "Jan 2024 - Feb 2025",
        position: "Co-Lead",
        company: "Himpunan Mahasiswa Informatika UIN Sunan Kalijaga",
        description:
          "Coordinated initiatives, organized events, and supported team execution for academic programs.",
      },
      {
        period: "Feb 2024 - May 2025",
        position: "Leader",
        company: "Study Club Informatic of UIN Sunan Kalijaga",
        description:
          "Led technical projects and mentored peers through workshops and competitions.",
      },
    ],
  },
  {
    key: "professional",
    title: "Professional",
    color: "bg-gradient-to-br from-gray-600 to-gray-800",
    items: [
      {
        period: "Aug 2025 - Nov 2025",
        position: "Web Developer Intern",
        company: "Wesclic Technology",
        description:
          "Contributed to web application features, code reviews, and agile workflows using modern stacks.",
      },
      {
        period: "Jan 2025 - May 2025",
        position: "Full Stack Web Development Cohort",
        company: "Coding Camp by DBS Foundation",
        description:
          "Intensive program focusing on web development fundamentals, data structures, and collaborative project building.",
      },
      {
        period: "Sep 2024 - Jan 2025",
        position: "Android Development Cohort",
        company: "Bangkit led by Google, GoTo, & Traveloka",
        description:
          "Focused on Android fundamentals, architecture patterns, and capstone implementation.",
      },
      {
        period: "Feb 2025 - May 2025",
        position: "Web Developer",
        company: "KKN 61 UIN Sunan Kalijaga 2025",
        description:
          "Create a livestock information system website using laravel and filament.",
      },
    ],
  },
];
