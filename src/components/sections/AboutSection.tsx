import MaskText from "@/components/ui/MaskText";

export const AboutSection = () => {
  return (
    <section id="about" data-scroll-section className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">ABOUT</span>
      </div>

      <div className="mb-12">
        <MaskText
          phrases={[
            <span key="a">Every great product begin with an even</span>,
            <span key="b" className="text-accent">better story</span>,
          ]}
          className="text-4xl md:text-6xl font-bold leading-tight"
          lineClassName="h-[1.2em]"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <MaskText
            phrases={[
              "Since beginning my journey as a developer, I've been passionate about creating",
              "digital solutions that make a difference. From mobile applications to web platforms,",
              "I focus on building products that are both functional and beautiful. I'm quietly",
              "confident, naturally curious, and perpetually working on improving my skills one",
              "project at a time.",
            ]}
            className="text-lg text-muted-foreground leading-relaxed"
            lineClassName="h-[1.4em]"
            margin="-60%"
          />
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