import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ctaBg from "@/assets/cta-background.jpg";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${ctaBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
          Begin Your Sacred Journey Today
        </h2>
        <p className="font-body text-base text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Join thousands of Brahmin families who have found their perfect matches through our platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="font-body text-base px-8" onClick={() => navigate("/signup")}>Create Your Profile</Button>
          <Button size="lg" variant="outline" className="bg-transparent font-body text-base px-8 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/login")}>
            Login to Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
