import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactImage from "@/assets/contactImg.jpg";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-muted-foreground text-sm">
             Have questions, need guidance, or want to learn more about BOI Matrimony? 
            Our dedicated team is here to help you with care and clarity.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden max-w-6xl mx-auto grid lg:grid-cols-2">
          
          {/* Image Section */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full">
            <img
              src={contactImage}
              alt="Family conversation"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-heading text-lg italic text-white">
                "Support for families, guidance for meaningful connections."
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-5 lg:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      setForm({ ...form, name: e.target.value });
                    }
                  }}
                  className="font-body"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="font-body"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Phone Number (Optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="font-body"
                />
                <Input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="font-body"
                  required
                />
              </div>

              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="font-body min-h-[100px]"
                required
              />

              <Button type="submit" size="lg" className="w-full font-body text-base">
                Send Message
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-border space-y-4">
              
              <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <a href="tel:+919811424141" className="hover:text-primary transition-colors">
                  +91-9811424141
                </a>
              </div>

              <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <a href="mailto:boindia18@gmail.com" className="hover:text-primary transition-colors">
                  boindia18@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                A-2, Opp. Badli Industrial Area, Suraj Park, Sector 18,
Rohini, Delhi, 110042
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;