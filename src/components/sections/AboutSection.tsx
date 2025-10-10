export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20">
      <div className="mb-8">
        <span className="section-tag">ABOUT</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12">
        Every great product begin with an even{" "}
        <span className="text-accent">better story</span>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Since beginning my journey as a developer, I've been passionate about creating 
            digital solutions that make a difference. From mobile applications to web platforms, 
            I focus on building products that are both functional and beautiful. I'm quietly 
            confident, naturally curious, and perpetually working on improving my skills one 
            project at a time.
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <div className="text-3xl font-bold text-accent mb-2">2+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              YEARS OF EXPERIENCE
            </div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-accent mb-2">15+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              PROJECTS COMPLETED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};