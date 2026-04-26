import "@/landing/landing.css";
import Header from "@/landing/components/Header";
import HeroSlider from "@/landing/components/HeroSlider";
import AboutSection from "@/landing/components/AboutSection";
import HowItWorksSection from "@/landing/components/HowItWorksSection";
import SevaSection from "@/landing/components/SevaSection";
import WhyChooseSection from "@/landing/components/WhyChooseSection";
import MobileAppSection from "@/landing/components/MobileAppSection";
import CTASection from "@/landing/components/CTASection";
import ContactSection from "@/landing/components/ContactSection";

import Footer from "@/landing/components/Footer";
import TeamSection from "@/landing/components/TeamSection";
import DonationPopup from "./DonationPopup";
import { useEffect, useState } from "react";
import SEOContent from "@/landing/components/Seocontent ";


const Index = () => {
  const [donationOpen, setDonationOpen] = useState(false);

  useEffect(() => {
    setDonationOpen(true);
  }, []);

  return (
    <div className="min-h-screen landing-theme">
      <DonationPopup open={donationOpen} onOpenChange={setDonationOpen} />
      <Header />
      <main className="pt-16">
        <HeroSlider />
        <SEOContent />
        <AboutSection />
        <HowItWorksSection />
        <SevaSection />
        <TeamSection />
        <WhyChooseSection />
        <MobileAppSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
