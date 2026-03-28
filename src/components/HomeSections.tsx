"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Clock, CheckCircle, Star, Zap,
  Globe, Smartphone, ShoppingCart, BarChart3,
  Palette, Megaphone, TrendingUp, Shield
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ClientLogo from "@/components/ClientLogo";
import { useEffect, useRef, useState } from "react";

// ─── Static data ────────────────────────────────────────────────────────────

const workTypes = [
  { icon: Globe,        title: "Marketing Websites", desc: "High-converting business websites that look stunning and rank on Google. Built to attract leads and build trust with your audience.", badge: "Most Popular",    color: "from-blue-500 to-blue-600" },
  { icon: Smartphone,   title: "Mobile Apps",        desc: "iOS and Android applications built with React Native — fast, beautiful, and deployed to the App Store and Google Play.",            badge: null,            color: "from-violet-500 to-violet-600" },
  { icon: BarChart3,    title: "Web Applications",   desc: "Custom dashboards, portals, SaaS platforms, and internal tools tailored to your exact workflow and business logic.",                badge: null,            color: "from-cyan-500 to-cyan-600" },
  { icon: ShoppingCart, title: "E-Commerce Stores",  desc: "Online stores with Stripe payments, inventory management, and a seamless checkout experience for your customers.",                   badge: null,            color: "from-emerald-500 to-emerald-600" },
  { icon: Palette,      title: "UI/UX Design",       desc: "Beautiful, user-focused interface design from wireframes to high-fidelity prototypes ready for developer handoff.",                  badge: null,            color: "from-pink-500 to-pink-600" },
  { icon: Megaphone,    title: "Landing Pages",      desc: "Focused, high-speed landing pages optimised for conversions — perfect for product launches, ads, and campaigns.",                    badge: "Fast Delivery", color: "from-orange-500 to-orange-600" },
];

const deliverySteps = [
  { step: "01", title: "Tell Us About Your Business", desc: "Fill out a simple form with your business name, type, and what you need." },
  { step: "02", title: "We Design & Build It",        desc: "Our team gets to work immediately — design, development, and content in one sprint." },
  { step: "03", title: "Review & Go Live",            desc: "You review the result. We handle changes, domain setup, and go live — all in 24 hours." },
];

const testimonials = [
  { name: "GetFit Studio", author: "Sarah M., Owner",   text: "I had my website live in less than a day. The quality was incredible for the price and timeline!" },
  { name: "Prime Salon",   author: "James K., Manager", text: "Our booking site was ready overnight. We got new client inquiries within the first week." },
  { name: "Urban Clinic",  author: "Dr. Anita R.",      text: "Fast, professional, and exactly what we needed. I couldn't believe it was done in 24 hours." },
];

interface Client  { _id: string; name: string; logo: string; industry: string; }
interface Package { _id: string; name: string; price: number; features: string[]; order: number; isPopular: boolean; }

// ─── Animated counter ───────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = Math.ceil(to / 40);
        const timer = setInterval(() => {
          start = Math.min(start + step, to);
          setCount(start);
          if (start >= to) clearInterval(timer);
        }, 30);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Professional background (replaces SolarSystem) ─────────────────────────

function ProfessionalBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0F1C]">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.45) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[160px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.30, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[160px]"
      />

      {/* Diagonal accent line */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: "linear-gradient(135deg, transparent 49.9%, rgba(99,102,241,0.4) 50%, transparent 50.1%)" }} />
      </div>

      {/* Floating social-proof cards — only after hydration */}
      {mounted && (
        <>
          {/* "Website Live" card — right side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-[22%] right-6 lg:right-20 hidden md:block"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-52"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-white/50 text-xs font-medium">Just delivered</span>
              </div>
              <div className="text-white font-bold text-sm">GetFit Studio</div>
              <div className="text-emerald-400 text-xs mt-0.5 font-medium">✓ Live in 18 hours</div>
              <div className="mt-3 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* PageSpeed card — left side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute bottom-[30%] left-6 lg:left-20 hidden md:block"
          >
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-48"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white/50 text-xs">PageSpeed Score</span>
              </div>
              <div className="text-3xl font-black text-white leading-none">
                98<span className="text-lg text-primary font-bold">/100</span>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 1.8, delay: 2.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Shield / trust badge — top left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="absolute top-[30%] left-6 lg:left-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-white text-xs font-bold">30+ Businesses</div>
                  <div className="text-slate-400 text-[10px]">Served & satisfied</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#0A0F1C]">
      <ProfessionalBackground />

      <div className="section-container relative z-10 py-24 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-semibold mb-8 shadow-2xl"
        >
          <Clock className="w-4 h-4 text-primary" />
          Your website delivered in 24 hours — guaranteed
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-balance drop-shadow-lg"
        >
          Custom Websites That<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Grow Your Business
          </span><br />
          — Done in 24 Hours
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          I build <strong className="text-white">professional marketing websites</strong> for businesses
          that want to grow online — fast. No templates. No waiting weeks.{" "}
          <strong className="text-white">Just a great website, delivered in one day.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/contact" className="btn-primary text-base px-10 py-4 shadow-xl shadow-primary/20">
            Get My Website Now <ArrowRight className="w-5 h-5" />
          </Link>
          {/* <Link href="/#our-work" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-10 py-4 backdrop-blur-sm">
            See What I Build
          </Link> */}
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {[
            { icon: CheckCircle, label: "No templates — 100% custom" },
            { icon: Zap,          label: "Ready in 24 hours" },
            { icon: Star,         label: "30+ happy businesses" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm text-sm text-slate-300">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="grid grid-cols-3 divide-x divide-white/10 max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
        >
          {[
            { value: 30, suffix: "+", label: "Clients" },
            { value: 24, suffix: "hr", label: "Delivery" },
            { value: 98, suffix: "%", label: "Satisfaction" },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="py-4 text-center">
              <div className="text-2xl font-black text-white">
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Our Work ────────────────────────────────────────────────────────────────

export function OurWorkSection() {
  return (
    <section id="our-work" className="py-24 bg-white dark:bg-[#0A0F1C]">
      <div className="section-container">
        <SectionTitle
          badge="Our Work"
          title="Everything I Build for "
          highlight="Your Business"
          subtitle="From marketing sites to mobile apps and e-commerce stores — I cover the full spectrum of digital products."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card p-8 group cursor-default relative overflow-hidden"
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />

              {item.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {item.badge}
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-dark dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="btn-primary">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

export function ProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
            The 24hr Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-balance">
            From Idea to Live Website<br />in Just 24 Hours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[16.5%] right-[16.5%] h-px bg-white/20" />

          {deliverySteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-black mx-auto mb-5 ring-2 ring-white/30">
                {s.step}
              </div>
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-primary font-bold text-base hover:shadow-xl transition-shadow">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface dark:bg-slate-900/50">
      <div className="section-container">
        <SectionTitle
          badge="Reviews"
          title="What Business Owners "
          highlight="Say"
          subtitle="Real results from real clients who got their website in 24 hours."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="card p-8"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-dark dark:text-white">{t.name}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">{t.author}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export function ClientsSection({ clients }: { clients: Client[] }) {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0F1C]">
      <div className="section-container">
        <SectionTitle badge="Trusted By" title="Businesses That " highlight="Trust Us" />
        <div className="flex flex-wrap justify-center gap-6">
          {clients.slice(0, 6).map((client, i) => (
            <ClientLogo key={client._id} name={client.name} logo={client.logo} industry={client.industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

export function CtaSection() {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="section-container text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-8">
            <Clock className="w-4 h-4 text-secondary" />
            Limited slots available — book yours today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-balance">
            Your Business Deserves a<br />
            <span className="gradient-text">Great Website — Today.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Stop losing customers to competitors with better websites. Get yours live in 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-gradient-brand text-white font-bold text-lg hover:opacity-90 hover:shadow-2xl transition-all"
          >
            Get My Website in 24hrs <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-6">
            No commitments. Tell me about your business and I&apos;ll get started.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

export function PricingSection({ packages }: { packages: Package[] }) {
  if (!packages || packages.length === 0) return null;
  return (
    <section className="py-24 bg-surface dark:bg-slate-900/50" id="pricing">
      <div className="section-container">
        <SectionTitle
          badge="Pricing"
          title="Simple & Transparent "
          highlight="Packages"
          subtitle="Affordable plans tailored to get your business online."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`card flex flex-col p-8 ${
                pkg.isPopular
                  ? "border-2 border-primary shadow-2xl relative transform lg:-translate-y-4"
                  : "border border-slate-200 bg-white shadow-lg"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-brand text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-dark dark:text-white">
                    {pkg.price === 0 ? "Custom" : `₹${pkg.price.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`w-full py-4 rounded-xl text-center font-bold text-sm transition-all ${
                  pkg.isPopular
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                    : "bg-slate-100 dark:bg-slate-800 text-dark dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
