import { MagneticLogo } from '@/components/ui/MagneticLogo';

export const SkillsSection = () => {
  // Skills based on listskill.txt with corresponding devicon classes
  const skills = [
    { name: "React.js", iconClass: "devicon-react-original" },
    { name: "Next.js", iconClass: "devicon-nextjs-plain" },
    { name: "PHP", iconClass: "devicon-php-plain" },
    { name: "Laravel", iconClass: "devicon-laravel-plain" },
    { name: "Bootstrap", iconClass: "devicon-bootstrap-plain" },
    { name: "HTML", iconClass: "devicon-html5-plain" },
    { name: "CSS", iconClass: "devicon-css3-plain" },
    { name: "Android Studio", iconClass: "devicon-androidstudio-plain" },
    { name: "Kotlin", iconClass: "devicon-kotlin-plain" },
    { name: "Vite", iconClass: "devicon-vitejs-plain" },
    { name: "FilamentPHP", iconClass: "devicon-php-plain" }, // Using PHP icon as FilamentPHP doesn't have specific icon
    { name: "Github", iconClass: "devicon-github-original" },
    { name: "GIT", iconClass: "devicon-git-plain" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain" },
    { name: "Node.JS", iconClass: "devicon-nodejs-plain" },
    { name: "Netlify", iconClass: "devicon-netlify-plain" },
    { name: "Postman", iconClass: "devicon-postman-plain" },
    { name: "SQL", iconClass: "devicon-mysql-plain" }, // Using MySQL icon for SQL
    { name: "TailwindCSS", iconClass: "devicon-tailwindcss-plain" },
    { name: "Typescript", iconClass: "devicon-typescript-plain" },
    { name: "Vercel", iconClass: "devicon-vercel-plain" },
    { name: "VueJS", iconClass: "devicon-vuejs-plain" },
    { name: "Wordpress", iconClass: "devicon-wordpress-plain" },
    { name: "VSCode", iconClass: "devicon-vscode-plain" },
  ];

  return (
    <section
      id="skills"
      data-scroll-section
      className="section-min section-spacing overflow-x-hidden min-w-0 bg-black"
    >
      <div className="container mx-auto px-4 py-16">
        {/* Flex layout with title on left and grid on right */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Title section - left side */}
          <div className="text-left lg:w-1/3 flex-shrink-0">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white">
              Skill
            </h2>

            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Just a mediocre person who tries out some of the combat tools that
              are the mainstay for several projects. I would be hypocritical if
              I didn't make the most of AI.
            </p>
          </div>

          {/* Grid layout - right side with magnetic logos */}
          <div className="flex-1">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-6 sm:gap-8">
              {skills.map((skill, index) => (
                <MagneticLogo
                  key={index}
                  title={skill.name}
                  className="flex items-center justify-center p-4"
                >
                  <i
                    className={`${skill.iconClass} text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-300`}
                  ></i>
                </MagneticLogo>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
