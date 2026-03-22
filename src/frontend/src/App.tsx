import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BarChart3,
  ChevronUp,
  DollarSign,
  Facebook,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Services", "Portfolio", "Testimonials", "Team", "Contact"];

const STATS = [
  { value: "500+", label: "Clients" },
  { value: "10x", label: "Average ROI" },
  { value: "5 Yrs", label: "Experience" },
  { value: "98%", label: "Client Retention" },
];

const SERVICES = [
  {
    title: "SEO Optimization",
    desc: "Dominate search rankings with data-driven SEO strategies that drive organic traffic and qualified leads.",
    icon: Search,
    color: "lime",
  },
  {
    title: "Social Media Marketing",
    desc: "Build a powerful social presence that engages your audience and converts followers into loyal customers.",
    icon: Share2,
    color: "pink",
  },
  {
    title: "PPC & Paid Ads",
    desc: "Maximize your ad spend with precision-targeted campaigns that deliver measurable ROI across all platforms.",
    icon: Target,
    color: "blue",
  },
  {
    title: "Content Marketing",
    desc: "Compelling content that tells your brand story, educates your audience, and drives inbound leads.",
    icon: FileText,
    color: "lime",
  },
  {
    title: "Brand Strategy",
    desc: "Build a brand identity that resonates deeply with your target audience and stands out in the market.",
    icon: Palette,
    color: "pink",
  },
  {
    title: "Web Design",
    desc: "High-converting websites designed with performance, UX, and brand aesthetics as the primary focus.",
    icon: Globe,
    color: "blue",
  },
];

const PORTFOLIO = [
  {
    industry: "FinTech",
    client: "TechStart Finance",
    result: "300%",
    metric: "Lead Increase",
    color: "lime",
    desc: "Complete digital overhaul including SEO, PPC, and content marketing strategy.",
  },
  {
    industry: "E-commerce",
    client: "ShopNova",
    result: "5x",
    metric: "ROAS",
    color: "pink",
    desc: "Performance marketing campaigns across Google, Meta, and programmatic channels.",
  },
  {
    industry: "SaaS Platform",
    client: "CloudFlow",
    result: "200%",
    metric: "Organic Traffic",
    color: "blue",
    desc: "Technical SEO, content strategy, and conversion rate optimisation.",
  },
  {
    industry: "D2C Fashion",
    client: "ThreadsBy",
    result: "10x",
    metric: "Social Following",
    color: "lime",
    desc: "Viral social media campaigns and influencer marketing with measurable growth.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechStart",
    quote:
      "BrandOrbit transformed our digital presence completely. Our leads tripled in just 6 months.",
    avatar: "RS",
    color: "lime",
  },
  {
    name: "Priya Patel",
    role: "Founder, StyleCo",
    quote:
      "Our sales doubled within 3 months of partnering with BrandOrbit. Truly exceptional results.",
    avatar: "PP",
    color: "pink",
  },
  {
    name: "Amit Kumar",
    role: "MD, FinanceHub",
    quote:
      "Best ROI we've ever seen from any marketing agency. The team is world-class.",
    avatar: "AK",
    color: "blue",
  },
];

const TEAM = [
  {
    name: "Madhav Sahu",
    role: "Founder & CEO",
    img: "/assets/uploads/1763502946693-1.jpg",
    color: "lime",
    showDetails: true,
  },
  {
    name: "",
    role: "Head of Digital Strategy",
    img: "",
    color: "pink",
    showDetails: false,
  },
  {
    name: "",
    role: "Creative Director",
    img: "",
    color: "blue",
    showDetails: false,
  },
  {
    name: "",
    role: "SEO & Analytics Lead",
    img: "",
    color: "lime",
    showDetails: false,
  },
];

const SOCIAL_LINKS = [
  { Icon: Twitter, color: "blue", name: "Twitter" },
  { Icon: Instagram, color: "pink", name: "Instagram" },
  { Icon: Linkedin, color: "blue", name: "LinkedIn" },
  { Icon: Facebook, color: "lime", name: "Facebook" },
] as const;

const FOOTER_SOCIAL = [
  { Icon: Twitter, name: "Twitter" },
  { Icon: Instagram, name: "Instagram" },
  { Icon: Linkedin, name: "LinkedIn" },
  { Icon: Facebook, name: "Facebook" },
] as const;

const STARS = [1, 2, 3, 4, 5];

// ─── Color helpers ────────────────────────────────────────────────────────────

const COLOR = {
  lime: "#AADD00",
  pink: "#FF1F6B",
  blue: "#00AAEE",
} as const;

type ColorKey = keyof typeof COLOR;

function colorStyle(c: ColorKey) {
  return { color: COLOR[c] };
}
function bgColorStyle(c: ColorKey) {
  return { backgroundColor: COLOR[c] };
}
function glowClass(c: ColorKey) {
  return c === "lime"
    ? "card-glow-lime"
    : c === "pink"
      ? "card-glow-pink"
      : "card-glow-blue";
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10"
          : "bg-black"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <img
            src="/assets/uploads/IMG_20251213_055034_438-1.webp"
            alt="BrandOrbit"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              data-ocid={`nav.${link.toLowerCase()}.link`}
              onClick={() => scrollTo(link)}
              className="text-sm text-white/70 hover:text-white transition-colors font-medium"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            data-ocid="nav.get_started.button"
            onClick={() => scrollTo("Contact")}
            className="rounded-full px-6 font-semibold text-black"
            style={{ backgroundColor: COLOR.lime }}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          data-ocid="nav.mobile_menu.toggle"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-white/70 hover:text-white text-left font-medium"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("Contact")}
                className="rounded-full w-full font-semibold text-black mt-2"
                style={{ backgroundColor: COLOR.lime }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroOrbit() {
  const orbitColors = [COLOR.lime, COLOR.pink, COLOR.blue];
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central dot */}
      <div
        className="absolute w-4 h-4 rounded-full z-10 pulse-glow"
        style={{ backgroundColor: COLOR.lime }}
      />

      {/* Orbit rings */}
      {[120, 160, 200].map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border border-white/10"
          style={{ width: r * 2, height: r * 2 }}
        >
          <div
            className={`absolute w-3 h-3 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-${i + 1}`}
            style={{ backgroundColor: orbitColors[i] }}
          />
        </div>
      ))}

      {/* Floating metric cards */}
      <motion.div
        className="absolute top-8 right-8 bg-[#111] border border-white/10 rounded-xl p-3 float-anim"
        style={{ animationDelay: "0s" }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={16} style={colorStyle("lime")} />
          <div>
            <div className="text-xs text-white/50">Organic Traffic</div>
            <div className="text-lg font-bold" style={colorStyle("lime")}>
              +247%
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-16 bg-[#111] border border-white/10 rounded-xl p-3"
        style={{
          animation: "float 4s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      >
        <div className="flex items-center gap-2">
          <DollarSign size={16} style={colorStyle("pink")} />
          <div>
            <div className="text-xs text-white/50">Revenue Growth</div>
            <div className="text-lg font-bold" style={colorStyle("pink")}>
              5x ROAS
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-24 left-4 bg-[#111] border border-white/10 rounded-xl p-3"
        style={{
          animation: "float 4s ease-in-out infinite",
          animationDelay: "0.8s",
        }}
      >
        <div className="flex items-center gap-2">
          <BarChart3 size={16} style={colorStyle("blue")} />
          <div>
            <div className="text-xs text-white/50">Leads Generated</div>
            <div className="text-lg font-bold" style={colorStyle("blue")}>
              12,450
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 bg-[#111] border border-white/10 rounded-xl p-3"
        style={{
          animation: "float 4s ease-in-out infinite",
          animationDelay: "2s",
        }}
      >
        <div className="flex items-center gap-2">
          <Users size={16} style={colorStyle("lime")} />
          <div>
            <div className="text-xs text-white/50">Active Clients</div>
            <div className="text-lg font-bold text-white">500+</div>
          </div>
        </div>
      </motion.div>

      {/* Center dashboard image */}
      <div className="relative z-5">
        <img
          src="/assets/generated/hero-dashboard.dim_800x600.png"
          alt="BrandOrbit Dashboard"
          className="w-72 h-52 object-cover rounded-2xl opacity-80"
          style={{ boxShadow: "0 0 60px rgba(170,221,0,0.15)" }}
        />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-black min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 80% 50%, rgba(170,221,0,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(0,170,238,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              className="mb-6 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 border"
              style={{
                color: COLOR.lime,
                borderColor: `${COLOR.lime}40`,
                backgroundColor: `${COLOR.lime}10`,
              }}
            >
              <Zap size={12} className="mr-1.5" /> Growth Engine
            </Badge>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              We Orbit Your <span className="gradient-text-full">Brand</span>{" "}
              Around <span className="gradient-text-pink">Success</span>
            </h1>

            <p className="text-lg text-white/60 mb-8 max-w-xl leading-relaxed">
              BrandOrbit is a full-stack digital marketing agency that puts your
              brand at the center and builds every strategy, campaign, and
              creative around driving real, measurable growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="rounded-full px-8 font-bold text-black text-base"
                style={{ backgroundColor: COLOR.lime }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start Your Growth <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold text-base border-white/20 text-white hover:bg-white/5"
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Our Work
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const STAT_COLORS: ColorKey[] = ["lime", "pink", "blue", "lime"];

function StatsBar() {
  return (
    <section className="bg-[#0a0a0a] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl font-extrabold font-display mb-1"
                style={colorStyle(STAT_COLORS[i])}
              >
                {s.value}
              </div>
              <div className="text-sm text-white/50 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="bg-[#0d0d0d] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={colorStyle("lime")}
          >
            What We Do
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
            Our <span className="gradient-text-lime">Services</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            End-to-end digital marketing solutions tailored to accelerate your
            brand&apos;s growth at every stage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const c = s.color as ColorKey;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-[#111] rounded-2xl p-6 cursor-pointer transition-all duration-300 ${glowClass(c)}`}
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${COLOR[c]}15` }}
                >
                  <Icon size={22} style={colorStyle(c)} />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────────────

function Portfolio() {
  return (
    <section id="portfolio" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={colorStyle("pink")}
          >
            Case Studies
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
            Our <span className="gradient-text-pink">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PORTFOLIO.map((p, i) => {
            const c = p.color as ColorKey;
            return (
              <motion.div
                key={p.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-[#111] rounded-2xl p-8 transition-all duration-300 ${glowClass(c)}`}
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge
                      className="text-xs font-semibold mb-2"
                      style={{
                        color: COLOR[c],
                        backgroundColor: `${COLOR[c]}15`,
                        border: `1px solid ${COLOR[c]}30`,
                      }}
                    >
                      {p.industry}
                    </Badge>
                    <h3 className="font-display text-xl font-bold">
                      {p.client}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-display text-4xl font-extrabold"
                      style={colorStyle(c)}
                    >
                      {p.result}
                    </div>
                    <div className="text-xs text-white/50">{p.metric}</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {p.desc}
                </p>
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-semibold"
                  style={colorStyle(c)}
                >
                  View Case Study <ArrowRight size={14} className="ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={colorStyle("blue")}
          >
            Client Love
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
            What They <span className="gradient-text-full">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => {
            const c = t.color as ColorKey;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`bg-[#111] rounded-2xl p-6 transition-all duration-300 ${glowClass(c)}`}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {STARS.map((n) => (
                    <Star
                      key={n}
                      size={14}
                      fill={COLOR[c]}
                      style={colorStyle(c)}
                    />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6 text-sm italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={bgColorStyle(c)}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────

function Team() {
  return (
    <section id="team" className="bg-[#0d0d0d] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={colorStyle("lime")}
          >
            The Crew
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
            Meet the <span className="gradient-text-lime">Team</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => {
            const c = member.color as ColorKey;
            return (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-[#111] rounded-2xl overflow-hidden transition-all duration-300 ${glowClass(c)}`}
                data-ocid={`team.item.${i + 1}`}
              >
                {member.showDetails ? (
                  // Full card: photo + name + role
                  <>
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1/2"
                        style={{
                          background:
                            "linear-gradient(to top, #111, transparent)",
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold">{member.name}</h3>
                      <p className="text-xs mt-0.5" style={colorStyle(c)}>
                        {member.role}
                      </p>
                    </div>
                  </>
                ) : (
                  // Role-only card: icon placeholder + role text
                  <div className="flex flex-col items-center justify-center py-10 px-4 gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${COLOR[c]}18` }}
                    >
                      <Users size={28} style={colorStyle(c)} />
                    </div>
                    <p
                      className="text-sm font-semibold text-center"
                      style={colorStyle(c)}
                    >
                      {member.role}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.", {
      style: {
        background: "#111",
        border: "1px solid #AADD0040",
        color: "#fff",
      },
    });
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={colorStyle("pink")}
          >
            Let&apos;s Talk
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
            Start Your <span className="gradient-text-pink">Journey</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Ready to put your brand in orbit? Let&apos;s build something
            extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#111] rounded-2xl p-8 card-glow-lime space-y-5"
              data-ocid="contact.modal"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Full Name
                </label>
                <Input
                  id="contact-name"
                  data-ocid="contact.name.input"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Rahul Sharma"
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 focus:border-[#AADD00]"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Email Address
                </label>
                <Input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="rahul@company.com"
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 focus:border-[#AADD00]"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Service Needed
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, service: v }))
                  }
                >
                  <SelectTrigger
                    id="contact-service"
                    data-ocid="contact.service.select"
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {SERVICES.map((s) => (
                      <SelectItem
                        key={s.title}
                        value={s.title}
                        className="text-white hover:bg-white/10"
                      >
                        {s.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project and goals..."
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 focus:border-[#AADD00] resize-none"
                />
              </div>
              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full rounded-full font-bold text-black text-base"
                style={{ backgroundColor: loading ? "#888" : COLOR.lime }}
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <ArrowRight size={18} className="ml-2" />}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 justify-center"
          >
            {[
              {
                icon: Mail,
                label: "Email Us",
                value: "hello@brandorbit.in",
                color: "lime" as ColorKey,
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 98765 43210",
                color: "pink" as ColorKey,
              },
              {
                icon: MapPin,
                label: "Visit Us",
                value: "Mumbai, Maharashtra, India",
                color: "blue" as ColorKey,
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className={`flex items-center gap-4 bg-[#111] rounded-2xl p-6 transition-all ${glowClass(color)}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${COLOR[color]}15` }}
                >
                  <Icon size={20} style={colorStyle(color)} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-medium mb-0.5">
                    {label}
                  </div>
                  <div className="font-semibold">{value}</div>
                </div>
              </div>
            ))}

            <div className="bg-[#111] rounded-2xl p-6 card-glow-blue">
              <p className="text-sm text-white/50 mb-3 font-medium">
                Follow Our Journey
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ Icon, color, name }) => (
                  <button
                    type="button"
                    key={name}
                    aria-label={name}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      backgroundColor: `${COLOR[color]}15`,
                      color: COLOR[color],
                    }}
                    data-ocid="contact.social.button"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img
              src="/assets/uploads/IMG_20251213_055034_438-1.webp"
              alt="BrandOrbit"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Putting your brand in orbit. Full-stack digital marketing
              solutions that drive real, measurable growth.
            </p>
            <div className="flex gap-3 mt-5">
              {FOOTER_SOCIAL.map(({ Icon, name }) => (
                <button
                  type="button"
                  key={name}
                  aria-label={name}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-display font-bold text-sm mb-4"
              style={colorStyle("lime")}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.toLowerCase()}.link`}
                    onClick={() => scrollTo(link.toLowerCase())}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-display font-bold text-sm mb-4"
              style={colorStyle("pink")}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <span className="text-sm text-white/50">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {year} BrandOrbit. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll to Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center z-50 text-black font-bold"
          style={{ backgroundColor: COLOR.lime }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Portfolio />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
