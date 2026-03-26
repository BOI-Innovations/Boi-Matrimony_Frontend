import { useEffect } from "react";
import Header from "@/landing/components/Header";
import Footer from "@/landing/components/Footer";
import "@/landing/landing.css";
import { RefreshCcw, Search, CreditCard, XCircle, Shield, AlertTriangle, Clock, CheckCircle, Ban, Mail } from "lucide-react";

const RefundPolicy = () => {
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
          <RefreshCcw size={32} className="text-primary" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          Refund Policy
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Please review our refund policy carefully before purchasing any membership plan. We encourage thorough evaluation of our platform to ensure it meets your expectations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground font-medium">
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Shield size={15} className="text-primary" /> Transparent Policy</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Search size={15} className="text-primary" /> Evaluate Before Purchase</span>
          <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"><Clock size={15} className="text-primary" /> Cancel Anytime</span>
        </div>
      </div>
    </section>

    <main className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-6">

        <SectionCard icon={Search} title="1. Evaluation Before Purchase">
          <HighlightBox icon={CheckCircle} text="We strongly encourage you to use our free services to explore and evaluate the profiles available on our website." />
          <p className="mt-5">This will help you determine if our platform aligns with your preferences and expectations before committing to a paid membership. Take your time to browse profiles, understand our features, and assess the quality of matches available before making any purchase decision.</p>
        </SectionCard>

        <SectionCard icon={CreditCard} title="2. No Refunds for Subscription Fees">
          <HighlightBox icon={Ban} text="Once a membership plan is purchased, refunds will not be entertained under any circumstances." variant="destructive" />
          <p className="mt-5">This policy is in place because our services are rendered immediately after purchase, granting access to premium features and member profiles. By completing your purchase, you acknowledge and accept that all subscription fees are non-refundable.</p>
        </SectionCard>

        <SectionCard icon={Shield} title="3. No Guarantee of Success">
          <p>While we provide tools and services to help you find a suitable match, we cannot guarantee that you will find your ideal partner through our platform. Our role is to facilitate connections, but the outcome of these connections depends on numerous factors beyond our control, including but not limited to:</p>
          <BulletList items={[
            "Personal compatibility and mutual interest between members",
            "Family approvals and cultural considerations",
            "Geographic and logistical factors",
            "Individual preferences and expectations",
            "Timing and circumstances of both parties",
          ]} />
        </SectionCard>

        <SectionCard icon={XCircle} title="4. Subscription Cancellation">
          <p>You have the option to cancel your subscription at any time. However, please note the following important details:</p>
          <BulletList items={[
            "Cancellation will not result in a refund of any fees already paid",
            "Your membership will remain active until the end of the current billing cycle",
            "You will continue to have access to all premium features until the billing period ends",
            "No partial refunds will be issued for unused days within the billing cycle",
          ]} />
        </SectionCard>

        <SectionCard icon={AlertTriangle} title="5. Acknowledgment of Policy">
          <p>By purchasing a membership plan on BOI Matrimony, you acknowledge and agree to this refund policy in its entirety. We appreciate your understanding and are committed to providing a positive experience on our platform. We encourage all members to:</p>
          <BulletList items={[
            "Read and understand all terms before making a purchase",
            "Contact our support team with any questions prior to payment",
            "Take advantage of free features to evaluate the platform",
            "Make informed decisions based on your thorough assessment",
          ]} />
        </SectionCard>

        <SectionCard icon={Mail} title="6. Questions or Concerns">
          <p className="mb-4">If you have any questions about this Refund Policy or need clarification on any terms, please contact us before making a purchase:</p>
          <ContactPill />
        </SectionCard>

        {/* Page Footer */}
        <PageFooter date="March 16, 2026" />
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

export default RefundPolicy;
