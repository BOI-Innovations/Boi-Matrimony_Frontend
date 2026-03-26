import { useEffect } from "react";
import Header from "@/landing/components/Header";
import Footer from "@/landing/components/Footer";
import "@/landing/landing.css";
import { FileText, UserCheck, Shield, Heart, ChevronRight, AlertTriangle, Mail, Ban, Scale, Settings, Lock, Edit } from "lucide-react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div className="min-h-screen landing-theme">
    <Header />

    {/* Hero */}
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/6 via-background to-primary/4" />
      <div className="absolute -top-10 -right-20 w-[420px] h-[420px] bg-secondary/4 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-10 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Scale size={32} className="text-primary" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          These terms outline the rules and guidelines for using BOI Matrimony. Please read them carefully before using our platform.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground font-medium">
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Shield size={15} className="text-primary" /> Fair Terms</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><UserCheck size={15} className="text-primary" /> Community First</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Heart size={15} className="text-primary" /> Seva Driven</span>
        </div>
      </div>
    </section>

    <main className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-6">

        <SectionCard icon={FileText} title="1. Acceptance of Terms">
          <p>By accessing or using BOI Matrimony, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our platform.</p>
        </SectionCard>

        <SectionCard icon={UserCheck} title="2. Eligibility">
          <BulletList items={[
            "You must be at least 18 years of age (21 for males, 18 for females as per Indian law)",
            "You must be legally eligible for marriage",
            "You must provide accurate and truthful information",
            "You must be a member of the Brahmin community or registering on behalf of a family member",
          ]} />
        </SectionCard>

        <SectionCard icon={Shield} title="3. User Responsibilities">
          <BulletList items={[
            "Provide accurate, complete, and current information in your profile",
            "Maintain the confidentiality of your account credentials",
            "Treat all members and their families with respect and dignity",
            "Use the platform solely for genuine matrimonial purposes",
            "Not engage in fraudulent, misleading, or inappropriate behavior",
          ]} />
        </SectionCard>

        <SectionCard icon={Heart} title="4. Seva Initiative (₹2100)">
          <HighlightBox icon={Heart} text="The ₹2100 Seva contribution is a voluntary community initiative to support the platform." variant="secondary" />
          <p className="mt-5 mb-4">This contribution is:</p>
          <BulletList items={[
            "Applicable until marriage is successfully completed",
            "Used to maintain and improve the platform",
            "Non-refundable once services have been rendered",
            "Subject to change with prior notice to members",
          ]} />
        </SectionCard>

        <SectionCard icon={Edit} title="5. Profile Content">
          <p>You are solely responsible for the content you post on your profile. We reserve the right to remove any content that violates our guidelines, is misleading, or is deemed inappropriate for a matrimonial platform.</p>
        </SectionCard>

        <SectionCard icon={Lock} title="6. Privacy & Communication">
          <p>All communication between members should be respectful and conducted with the intention of exploring matrimonial compatibility. Harassment, spam, or unsolicited commercial communication is strictly prohibited.</p>
        </SectionCard>

        <SectionCard icon={Scale} title="7. Limitation of Liability">
          <HighlightBox icon={AlertTriangle} text="Users are advised to verify information independently before making any decisions." variant="destructive" />
          <p className="mt-5">BOI Matrimony serves as a platform to connect families and individuals. We do not guarantee the accuracy of information provided by members, nor do we guarantee successful matches.</p>
        </SectionCard>

        <SectionCard icon={Ban} title="8. Account Termination">
          <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or behave inappropriately on the platform. Users may also delete their accounts at any time.</p>
        </SectionCard>

        <SectionCard icon={Settings} title="9. Modifications">
          <p>We may update these Terms & Conditions from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
        </SectionCard>

        <SectionCard icon={Mail} title="10. Contact">
          <p className="mb-4">For any questions regarding these Terms & Conditions, please reach out to us:</p>
          <ContactPill />
        </SectionCard>

        {/* Page Footer */}
        <PageFooter date="March 10, 2026" />
      </div>
    </main>

    <Footer />
  </div>
  );
};

/* ─── Shared Sub-components ─── */

const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-[var(--shadow-card)] scroll-mt-24">
    <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-5 flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-primary" />
      </span>
      {title}
    </h2>
    <div className="font-body text-foreground/80 leading-relaxed text-justify">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3">
        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span className="text-justify">{t}</span>
      </li>
    ))}
  </ul>
);

const HighlightBox = ({ icon: Icon, text, variant = "primary" }: { icon: React.ElementType; text: string; variant?: "primary" | "secondary" | "destructive" }) => {
  const colors = {
    primary: "bg-primary/5 border-primary/15 text-primary",
    secondary: "bg-secondary/5 border-secondary/15 text-secondary",
    destructive: "bg-destructive/5 border-destructive/15 text-destructive",
  };
  return (
    <div className={`${colors[variant].split(" ").slice(0, 2).join(" ")} border rounded-xl px-5 py-3.5 flex items-center gap-3`}>
      <Icon size={16} className={colors[variant].split(" ")[2]} />
      <p className="text-sm font-semibold text-foreground">{text}</p>
    </div>
  );
};

const ContactPill = () => (
  <div className="bg-background rounded-xl p-4 border border-border inline-flex items-center gap-3">
    <Mail size={18} className="text-primary" />
    <a href="mailto:boindia18@gmail.com" className="text-primary font-medium hover:underline">boindia18@gmail.com</a>
  </div>
);

const PageFooter = ({ date }: { date: string }) => (
  <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
    <p className="flex items-center gap-2"><AlertTriangle size={14} className="text-primary" /> Last Updated: {date}</p>
    <p>Questions? <a href="mailto:boindia18@gmail.com" className="text-primary hover:underline">boindia18@gmail.com</a></p>
  </div>
);

export default TermsAndConditions;
