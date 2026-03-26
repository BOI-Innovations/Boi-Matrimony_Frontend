import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import sevaImage from "@/assets/sevaImg.png";

const SevaSection = () => (
  <section id="community-initiative" className="pt-4 pb-4 lg:pt-12 lg:pb-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
  <p className="font-body font-semibold text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-3">
    Community Initiative
  </p>

  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
    ₹2,100 Community Contribution
  </h2>

  <div className="space-y-4 font-body text-primary-foreground/85 leading-relaxed text-sm">
    <p>
      A one-time contribution of ₹2,100 supports this community initiative dedicated to helping 
      Brahmin families connect for respectful, value-based, and tradition-aligned relationships. 
      Your contribution helps maintain the platform and supports volunteers working to serve the 
      community with dedication and integrity.
    </p>
  </div>

  <ul className="space-y-3 mt-6 mb-8">
    <li className="flex items-center gap-3 font-body text-sm text-primary-foreground/90">
      <CheckCircle size={18} className="text-primary-foreground shrink-0" />
      Browse Brahmin family profiles.
    </li>

    <li className="flex items-center gap-3 font-body text-sm text-primary-foreground/90">
      <CheckCircle size={18} className="text-primary-foreground shrink-0" />
      Connect with families sharing similar traditions and values.
    </li>

    <li className="flex items-center gap-3 font-body text-sm text-primary-foreground/90">
      <CheckCircle size={18} className="text-primary-foreground shrink-0" />
      Discover matches that fit your preferences.
    </li>

    <li className="flex items-center gap-3 font-body text-sm text-primary-foreground/90">
      <CheckCircle size={18} className="text-primary-foreground shrink-0" />
      Access the platform until you find your life partner.
    </li>
  </ul>
</div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={sevaImage} alt="Community service and helping hands" className="w-full h-[400px] object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-primary-foreground text-foreground rounded-2xl px-6 py-4 shadow-elevated">
            <p className="font-heading text-3xl font-bold">5000+</p>
            <p className="font-body text-sm text-muted-foreground">Lives Joined</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SevaSection;
