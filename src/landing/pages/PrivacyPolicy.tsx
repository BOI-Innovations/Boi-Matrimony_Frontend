import { useEffect } from "react";
import Header from "@/landing/components/Header";
import Footer from "@/landing/components/Footer";
import "@/landing/landing.css";
import { Shield, Lock, Eye, Database, Cookie, UserCheck, Mail, FileText, ChevronRight, AlertTriangle, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div className="min-h-screen landing-theme">
    <Header />

    {/* Hero */}
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/4" />
      <div className="absolute -top-10 -left-20 w-[420px] h-[420px] bg-primary/4 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-10 w-[500px] h-[500px] bg-secondary/4 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Shield size={32} className="text-primary" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          Privacy Policy
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Your privacy matters to us. This document explains how BOI Matrimony collects, uses, and protects your personal information.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground font-medium">
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Shield size={15} className="text-primary" /> Secure Platform</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Lock size={15} className="text-primary" /> Encrypted Data</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><UserCheck size={15} className="text-primary" /> User Control</span>
        </div>
      </div>
    </section>

    <main className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-6">

        <SectionCard icon={FileText} title="1. Introduction">
          <p>BOI Matrimony ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.</p>
        </SectionCard>

        <SectionCard icon={Database} title="2. Information We Collect">
          <p className="mb-5">We may collect the following types of information:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Personal Information", desc: "Name, email, phone number, date of birth, gender, photographs, and profile details provided during registration." },
              { label: "Cultural & Religious Info", desc: "Gotra, sub-caste, family background, and cultural details relevant to matrimonial matching." },
              { label: "Usage Data", desc: "Pages visited, search preferences, communication history, and how you interact with the platform." },
              { label: "Device Information", desc: "IP address, browser type, operating system, and device identifiers." },
            ].map((item) => (
              <div key={item.label} className="bg-background rounded-xl p-4 border border-border">
                <h4 className="font-heading text-sm font-semibold text-foreground mb-1.5">{item.label}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Eye} title="3. How We Use Your Information">
          <BulletList items={[
            "To create and manage your matrimonial profile",
            "To match you with compatible profiles based on your preferences",
            "To facilitate communication between prospective families",
            "To improve our platform and services",
            "To send important notifications and updates",
            "To ensure the safety and security of our community",
          ]} />
        </SectionCard>

        <SectionCard icon={Globe} title="4. Data Sharing & Disclosure">
          <HighlightBox icon={Shield} text="We do not sell your personal information." />
          <p className="mb-4 mt-5">We may share your data only in the following circumstances:</p>
          <BulletList items={[
            "With other registered members as part of the matchmaking process",
            "With service providers who assist in operating our platform",
            "When required by law or to protect our legal rights",
            "With your explicit consent",
          ]} />
        </SectionCard>

        <SectionCard icon={Lock} title="5. Data Security">
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        </SectionCard>

        <SectionCard icon={UserCheck} title="6. Your Rights">
          <BulletList items={[
            "Access and review your personal data",
            "Update or correct your information",
            "Request deletion of your account and data",
            "Withdraw consent for data processing",
            "Object to certain uses of your data",
          ]} />
        </SectionCard>

        <SectionCard icon={Cookie} title="7. Cookies">
          <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can manage cookie preferences through your browser settings.</p>
        </SectionCard>

        <SectionCard icon={Mail} title="8. Contact Us">
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
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

const HighlightBox = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="bg-primary/5 border border-primary/15 rounded-xl px-5 py-3.5 flex items-center gap-3">
    <Icon size={16} className="text-primary shrink-0" />
    <p className="text-sm font-semibold text-foreground">{text}</p>
  </div>
);

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

export default PrivacyPolicy;
