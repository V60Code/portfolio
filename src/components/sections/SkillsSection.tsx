export const SkillsSection = () => {
  const skills = [
    { name: "React", iconClass: "devicon-react-original" },
    { name: "Next.js", iconClass: "devicon-nextjs-plain" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain" },
    { name: "TypeScript", iconClass: "devicon-typescript-plain" },
    { name: "PHP", iconClass: "devicon-php-plain" },
    { name: "Laravel", iconClass: "devicon-laravel-plain" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain" },
    { name: "Android Studio", iconClass: "devicon-androidstudio-plain" },
    { name: "HTML", iconClass: "devicon-html5-plain" },
    { name: "CSS", iconClass: "devicon-css3-plain" },
    { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain" },
    { name: "Bootstrap", iconClass: "devicon-bootstrap-plain" },
    { name: "Git", iconClass: "devicon-git-plain" },
    { name: "MySQL", iconClass: "devicon-mysql-plain" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain" }
  ];

  return (
    <section id="skills" className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">SKILLS</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        My Expertise
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="skill-badge flex items-center gap-2">
            <i className={`${skill.iconClass} text-lg`}></i>
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
};