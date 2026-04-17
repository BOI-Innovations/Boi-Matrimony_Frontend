import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Home, Heart, MessageSquare, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  autoOpenSubscription?: boolean;
}

const DashboardLayout = ({ children, activeSection, onSectionChange, autoOpenSubscription }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          isMobileOpen={isMobileMenuOpen}
          onMobileOpenChange={setIsMobileMenuOpen}
        />
        <main className="flex-1 p-4 lg:p-6 lg:ml-64 mt-16 pb-16 lg:pb-0 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Small Screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => onSectionChange("home")}
            className={`flex flex-col items-center gap-1 ${activeSection === "home" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onSectionChange("matches")}
            className={`flex flex-col items-center gap-1 ${activeSection === "matches" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </button>
          <button
            onClick={() => onSectionChange("messages")}
            className={`flex flex-col items-center gap-1 ${activeSection === "messages" ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
