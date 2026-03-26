import { Instagram, Facebook, Linkedin } from "lucide-react";
import teamMember1 from "@/images/team/Pt. Sukhbir Sharma.jpg";
import teamMember2 from "@/images/team/Pt. Ramesh Kitchloo.jpg";
import teamMember3 from "@/images/team/Dr. Ravi Dutt Gaur.jpg";
import teamMember4 from "@/images/team/Dr Kuldeep Sharma.jpg";
import teamMember5 from "@/images/team/Goswami S.K. Puri.jpg";
import teamMember6 from "@/assets/team-member-6.jpg";
import teamMember7 from "@/assets/team-member-7.jpg";
import teamMember8 from "@/assets/team-member-8.jpg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Pt. Sukhbir Sharma",
    role: "Founder",
    image: teamMember1,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    // linkedin: "https://linkedin.com",
  },
  {
    name: "Pt. Ramesh Kitchloo",
    role: "President",
    image: teamMember2,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Dr. Ravi Dutt Gaur",
    role: "General Secretary",
    image: teamMember3,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    // linkedin: "https://linkedin.com",
  },
  {
    name: "Dr Kuldeep Sharma",
    role: "General Secretary",
    image: teamMember4,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Goswami S.K. Puri",
    role: "Treasurer",
    image: teamMember5,
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    // linkedin: "https://linkedin.com",
  },
];

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-primary hover:scale-110"
  >
    {children}
  </a>
);

const TeamCard = ({ member }: { member: TeamMember }) => (
  <div className="group rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 ease-out hover:-translate-y-1.5 overflow-hidden">
    <div className="relative overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full aspect-[3/3.5] object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 pl-3 -translate-x-14 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <SocialIcon href={member.instagram}>
          <Instagram size={14} />
        </SocialIcon>
        <SocialIcon href={member.facebook}>
          <Facebook size={14} />
        </SocialIcon>
        {member.linkedin && (
          <SocialIcon href={member.linkedin}>
            <Linkedin size={14} />
          </SocialIcon>
        )}
      </div>
    </div>
    <div className="p-4 text-center">
      <h3 className="font-heading text-base font-semibold text-foreground leading-tight">
        {member.name}
      </h3>
      <p className="font-body text-xs text-muted-foreground mt-1">
        {member.role}
      </p>
    </div>
  </div>
);

const TeamSection = () => (
  <section id="team" className="pt-8 pb-4 lg:pt-12 lg:pb-8 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-14">
  <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">
    Community Leaders & Coordinators
  </p>
  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
    Trusted by Dedicated Individuals
  </h2>
  <p className="font-body text-muted-foreground leading-relaxed">
    This platform is supported by a group of committed individuals who contribute selflessly to help families find suitable life partners, while ensuring trust, privacy, and respect for cultural values.
  </p>
</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
        {teamMembers.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
