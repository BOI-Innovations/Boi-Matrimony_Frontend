import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/boilogo.png";

const navItems = ["Home", "About", "How It Works", "Community Initiative", "Team", "Mobile App", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleNavClick = (item: string) => {
    const key = item.toLowerCase().replace(/\s+/g, "-");

    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }

    // Try scrolling within the landing page; fall back to nav to root
    if (!scrollToSection(key)) {
      navigate("/");
    }

    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold text-secondary">
          <img src={logo} alt="BOI Matrimony" className="h-10 w-auto" />
          
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {/* Desktop Nav */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors font-body"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="font-body" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="sm" className="font-body" onClick={() => navigate('/signup')}>
              Register
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors text-left font-body py-1"
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm" className="flex-1 font-body" onClick={() => navigate('/login')}>Login</Button>
            <Button size="sm" className="flex-1 font-body" onClick={() => navigate('/signup')}>Register</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
