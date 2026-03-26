import { useState } from "react";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "About", "How It Works", "Community Initiative", "Team", "Mobile App"];

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    const elementId = item.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(elementId);
    
    if (el) {
      // Element exists on current page, scroll to it
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Element doesn't exist, navigate to home page with hash
      navigate(`/#${elementId}`);
    }
  };

  return (
    <footer className="bg-secondary pt-10 pb-6 lg:pt-8 lg:pb-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">BOI Matrimony</h3>
            <p className="font-body text-secondary-foreground/70 text-sm leading-relaxed mb-4">
              A dedicated platform for the Brahmin community to find soulmates through a blend of traditional values and modern matchmaking technology.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-secondary-foreground/20 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-secondary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
              {navItems.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={(e) => scrollTo(e, l)}
                    className="hover:text-secondary-foreground transition-colors"
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-secondary-foreground mb-4">Privacy & You</h4>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollTo(e, "contact")}
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-secondary-foreground mb-4">Newsletter</h4>
            <p className="font-body text-secondary-foreground/70 text-sm mb-4">Stay updated with our latest community initiatives.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-body bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 text-sm"
              />
              <Button size="icon" variant="default" className="shrink-0">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-secondary-foreground/10 text-center">
          <p className="font-body text-sm text-secondary-foreground/50">© 2026 BOI Matrimony. All Rights Reserved. A Sanatan Seva Initiative.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
