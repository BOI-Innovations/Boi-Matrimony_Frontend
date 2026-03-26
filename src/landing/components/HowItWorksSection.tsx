import { UserPlus, Search, MessageCircle, Heart } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Your Profile", desc: "Register and create a detailed profile with your personal and cultural information." },
  { icon: Search, title: "Search Compatible Profiles", desc: "Browse profiles from the Brahmin community that match your preferences." },
  { icon: MessageCircle, title: "Connect With Families", desc: "Start respectful conversations with families and individuals." },
  { icon: Heart, title: "Begin Your Sacred Journey", desc: "Build a meaningful relationship rooted in trust and tradition." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="pt-0 pb-10 lg:pb-14 bg-background">
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Process</p>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Simple Steps to Begin Your Journey</h2>
      <p className="font-body text-muted-foreground mb-8 max-w-2xl mx-auto">Follow these simple steps to find your ideal life partner through our trusted platform.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-card rounded-2xl p-8 hover:shadow-md transition-shadow group border border-border">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <step.icon className="text-primary" size={28} />
            </div>
            <span className="inline-block text-sm font-bold font-body text-primary mb-2">Step {i + 1}</span>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{step.title}</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
