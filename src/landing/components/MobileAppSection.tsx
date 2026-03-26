import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import mockup from "@/assets/mobile-app-mockup.png";
import { toast } from "@/hooks/use-toast";

const MobileAppSection = () => {
  const handleComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "Application will come soon",
    });
  };

  return (
    <section id="mobile-app" className="pt-8 pb-8 sm:pb-6 lg:pt-12 lg:pb-6 bg-cream-pattern">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">

          {/* Mobile App Mockup */}
          <div className="flex justify-center relative">
            <img
              src={mockup}
              alt="BOI Matrimony mobile app"
              className="max-h-[500px] object-contain drop-shadow-2xl"
            />

            <div className="absolute top-4 right-4 lg:right-8 bg-primary text-primary-foreground rounded-xl px-3 py-2 shadow-elevated flex items-center gap-1">
              <Star size={14} className="fill-current" />
              <span className="font-body text-sm font-semibold">Top Rated</span>
            </div>
          </div>

          {/* App Info */}
          <div className="pb-4 sm:pb-2 lg:pb-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Download Our Mobile App
            </h2>

            <p className="font-body text-muted-foreground leading-relaxed mb-4 text-sm">
              Browse Brahmin family profiles and connect with potential matches anytime, anywhere.
              Our mobile app is designed for simplicity and speed, making it convenient to explore
              meaningful matrimonial connections on the go.
            </p>

            <p className="font-body text-muted-foreground italic text-sm mb-6">
              "Explore profiles and connect with families on the go."
            </p>

            <ul className="text-sm text-muted-foreground mb-8 space-y-2 list-disc list-inside">
              <li>Browse profiles easily and efficiently</li>
              <li>Connect with families from anywhere</li>
              <li>Continue your search for the right life partner anytime</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="font-body text-base px-8" onClick={handleComingSoon}>
                Get it on Google Play
              </Button>

              <Button size="lg" variant="outline" className="font-body text-base px-8" onClick={handleComingSoon}>
                Download on App Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;