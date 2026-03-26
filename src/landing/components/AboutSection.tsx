import { ShieldCheck, Landmark } from "lucide-react";
import aboutImage from "@/assets/about-image.png";

const AboutSection = () => (
  <section id="about" className="py-10 lg:py-14 bg-cream-pattern">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <img src={aboutImage} alt="Traditional Vedic wedding ceremony" className="w-full h-[400px] lg:h-[500px] object-cover" />
        </div>
        <div>
          <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Our Mission</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">About Our Initiative</h2>
          <div className="space-y-4 font-body text-muted-foreground leading-relaxed text-justify">
            <p>BOI Matrimony is a selfless social initiative dedicated to the Brahmin community, with the objective of preserving and promoting Sanatan culture, classical traditions, and strong family values.</p>
            <p>This platform is founded on the belief that cultural awareness and ethical conduct form the foundation of a stable and balanced married life.</p>
            <p>In today's rapidly changing social landscape, many families and young individuals find it difficult to identify a life partner who respects traditions while adapting to modern life.</p>
            <p>BOI Matrimony offers a trustworthy, dignified, and well-organized platform where cultural and spiritual harmony is given equal importance alongside personal preferences.</p>
            <p className="font-medium text-foreground italic">Marriage is not merely a union of two individuals but a sacred bond that connects families, values, and generations.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
