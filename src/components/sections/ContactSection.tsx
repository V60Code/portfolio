import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" data-scroll-section className="section-min section-spacing">
      <div className="mb-8">
        <span className="section-tag">CONTACT</span>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-16">
        Let's Work Together!
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-lg text-muted-foreground mb-8">
            Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with amazing people.
          </p>
          
          <div className="space-y-4">
            <a 
              href="mailto:m.alfarizihabibullah@gmail.com"
              className="text-accent hover:text-accent/80 transition-colors text-lg"
            >
              m.alfarizihabibullah@gmail.com
            </a>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
              PHONE
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-2">
              BUDGET
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
            >
              <option value="">Select Budget Range</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="over-10000">Over $10,000</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none transition-colors resize-vertical"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};