export const ResumeSection = () => {
  const experiences = [
    {
      period: "Jan 2025 - May 2025",
      position: "Coding Camp Cohort - Full-stack Web Dev",
      company: "DBS Foundation",
      description: "Intensive coding bootcamp focusing on full-stack web development, data structures, and algorithms. Building real-world projects and collaborating with industry mentors."
    },
    {
      period: "Aug 2025 - Nov 2025",
      position: "Web Developer Intern",
      company: "Weslic",
      description: "Developing web applications and contributing to open-source projects. Working with modern technologies and agile development methodologies."
    },
    {
      period: "Jan 2024 - Feb 2025",
      position: "Co-Lead",
      company: "HMPS (Student Association)",
      description: "Leading student initiatives and organizing tech events. Managing team coordination and project development for academic and community programs."
    },
    {
      period: "Feb 2024 - May 2025",
      position: "Technical Lead",
      company: "SCTT (Student Computing Team)",
      description: "Leading technical projects and mentoring junior developers. Organizing coding competitions and technical workshops for students."
    },
    {
      period: "Aug 2024 - Oct 2024",
      position: "Teaching Assistant",
      company: "Computer Security Course",
      description: "Assisting in computer security course delivery, helping students understand cybersecurity concepts, and grading assignments."
    },
    {
      period: "Sep 2024 - Feb 2025",
      position: "Bangkit Cohort - Android Dev",
      company: "Google, Tokopedia, Gojek, Traveloka",
      description: "Android Developer path in Google's flagship program. Learning Android Studio and MVVM, working on capstone projects, and developing soft skills."
    }
  ];

  return (
    <section id="resume" className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">Resume</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        Experience
      </h2>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-border pl-8">
            <div className="relative">
              <div className="absolute -left-10 w-4 h-4 bg-accent rounded-full"></div>
              <p className="text-sm text-accent mb-2">{exp.period}</p>
              <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
              <p className="text-muted-foreground mb-3">{exp.company}</p>
              <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};