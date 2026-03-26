import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.png";

const slides = [
  {
    label: "Established Tradition",
    heading: "Sacred Connections for the Brahmin Community",
    text: "BOI Matrimony is a selfless initiative connecting families who cherish Sanatan culture, classical traditions, and strong family values. Join a platform built on trust and respect to find life partners who honor these principles.",
    buttons: ["Create Your Profile", "Browse Profiles"],
    image: heroSlide1,
  },
  {
    label: "Preserving Heritage",
    heading: "Where Tradition Meets Modern Aspirations",
    text: "Our platform bridges the gap between timeless cultural heritage and today’s modern aspirations. Families and individuals seeking partners who value tradition while embracing contemporary life find a dignified space here.",
    buttons: ["Start Your Journey"],
    image: heroSlide2,
  },
  {
    label: "Trusted Platform",
    heading: "A Platform Rooted in Trust and Respect",
    text: "BOI Matrimony offers a secure and well-organized environment for meaningful connections. Here, ethical conduct, mutual understanding, and spiritual harmony are given equal importance alongside personal preferences.",
    buttons: ["Register Now"],
    image: heroSlide3,
  },
  {
    label: "Sacred Bond",
    heading: "Marriage as a Sacred Bond Across Generations",
    text: "Marriage is more than a union of individuals—it is a connection between families, values, and generations. Our initiative fosters relationships with dignity, preserving traditions for future generations without any commercial motive.",
    buttons: ["Join the Community"],
    image: heroSlide4,
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    // <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <section id="home" className="relative h-[80vh] lg:h-[85vh] min-h-[500px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <p
            key={`label-${current}`}
            className="font-body text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-4 animate-fade-in"
          >
            {slide.label}
          </p>
          <h1
            key={current}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight"
          >
            {slide.heading}
          </h1>
          <p className="font-body text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
            {slide.text}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in mb-6 lg:mb-0" style={{ animationDelay: "0.3s" }}>
            {slide.buttons.map((btn, i) => (
              <Button
                key={btn}
                size="lg"
                variant={i === 0 ? "default" : "outline"}
                className={`font-body text-base px-8 ${i > 0 ? "bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
                onClick={() => {
                  if (btn === "Browse Profiles") navigate("/login");
                  else navigate("/signup");
                }}
              >
                {btn}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation Buttons - Below Content */}
          <div className="flex lg:hidden justify-between animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <button onClick={prev} className="bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-2 transition-colors">
              <ChevronLeft className="text-primary-foreground" size={28} />
            </button>
            <button onClick={next} className="bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-2 transition-colors">
              <ChevronRight className="text-primary-foreground" size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Buttons - Overlay */}
      <button onClick={prev} className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-2 transition-colors">
        <ChevronLeft className="text-primary-foreground" size={28} />
      </button>
      <button onClick={next} className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-2 transition-colors">
        <ChevronRight className="text-primary-foreground" size={28} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-primary-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
