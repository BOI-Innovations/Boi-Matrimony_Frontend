import { Users, BookOpen, Shield, Home, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community-Centered Platform",
    desc: "Dedicated exclusively to the Brahmin community, bringing families together through shared cultural roots and values."
  },
  {
    icon: BookOpen,
    title: "Respect for Sanatan Traditions",
    desc: "Promoting classical traditions, cultural awareness, and the timeless principles of Sanatan Dharma."
  },
{
  icon: Shield,
  title: "Respectful Community Environment",
  desc: "Creating a respectful space where Brahmin families can connect and interact with dignity and cultural understanding."
},
  {
    icon: Home,
    title: "Family-Oriented Approach",
    desc: "Marriage connects families and generations, so our platform encourages meaningful family participation."
  },
  {
    icon: HeartHandshake,
    title: "Community Responsibility",
    desc: "A social initiative focused on strengthening trust, harmony, and relationships within the Brahmin community."
  },
];

const WhyChooseSection = () => (
  <section className="pt-4 pb-0 lg:pb-0 bg-background">
    <div className="container mx-auto px-4 lg:px-8 text-center">

      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
        Why Choose BOI Matrimony?
      </h2>

      <p className="font-body text-muted-foreground mb-14 max-w-3xl mx-auto text-sm leading-relaxed">
        BOI Matrimony is a social initiative dedicated to preserving Sanatan culture, classical traditions, and strong family values. 
        We believe marriage is not just a union of two individuals, but a sacred bond that connects families, traditions, and future generations. 
        Our platform provides a respectful and trustworthy environment where families can find life partners who value both tradition and modern understanding.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-card rounded-2xl p-6 hover:shadow-md transition-shadow text-center border border-border"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon className="text-primary" size={24} />
            </div>

            <h3 className="font-heading text-base font-semibold text-foreground mb-2">
              {f.title}
            </h3>

            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default WhyChooseSection;