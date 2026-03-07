"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle, Star, Zap, Globe, Smartphone, ShoppingCart, BarChart3, Palette, Megaphone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ClientLogo from "@/components/ClientLogo";

const workTypes = [
  { icon: Globe, title: "Marketing Websites", desc: "High-converting business websites that look stunning and rank on Google. Built to attract leads and build trust with your audience.", badge: "Most Popular", color: "from-blue-500 to-blue-600" },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS and Android mobile applications built with React Native — fast, beautiful, and deployed to the App Store and Google Play.", badge: null, color: "from-violet-500 to-violet-600" },
  { icon: BarChart3, title: "Web Applications", desc: "Custom dashboards, portals, SaaS platforms, and internal tools tailored to your exact workflow and business logic.", badge: null, color: "from-cyan-500 to-cyan-600" },
  { icon: ShoppingCart, title: "E-Commerce Stores", desc: "Online stores with Stripe payments, inventory management, and a seamless checkout experience for your customers.", badge: null, color: "from-emerald-500 to-emerald-600" },
  { icon: Palette, title: "UI/UX Design", desc: "Beautiful, user-focused interface design from wireframes to high-fidelity prototypes ready for developer handoff.", badge: null, color: "from-pink-500 to-pink-600" },
  { icon: Megaphone, title: "Landing Pages", desc: "Focused, high-speed landing pages optimized for conversions — perfect for product launches, ads, and campaigns.", badge: "Fast Delivery", color: "from-orange-500 to-orange-600" },
];

const deliverySteps = [
  { step: "1", title: "Tell Us About Your Business", desc: "Fill out a simple form with your business name, type, and what you need." },
  { step: "2", title: "We Design & Build It", desc: "Our team gets to work immediately — design, development, and content in one sprint." },
  { step: "3", title: "Review & Go Live", desc: "You review the result. We handle changes, domain setup, and go live — all in 24 hours." },
];

const testimonials = [
  { name: "GymFit Studio", author: "Sarah M., Owner", text: "I had my website live in less than a day. The quality was incredible for the price and timeline!" },
  { name: "Prime Salon", author: "James K., Manager", text: "Our booking site was ready overnight. We got new client inquiries within the first week." },
  { name: "Urban Clinic", author: "Dr. Anita R.", text: "Fast, professional, and exactly what we needed. I couldn't believe it was done in 24 hours." },
];

interface Client {
  _id: string;
  name: string;
  logo: string;
  industry: string;
}

import { useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

function SolarSystem({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const x1 = useTransform(mouseX, [-500, 500], [-10, 10]);
  const y1 = useTransform(mouseY, [-500, 500], [-10, 10]);
  
  const x2 = useTransform(mouseX, [-500, 500], [-20, 20]);
  const y2 = useTransform(mouseY, [-500, 500], [-20, 20]);
  
  const x3 = useTransform(mouseX, [-500, 500], [-35, 35]);
  const y3 = useTransform(mouseY, [-500, 500], [-35, 35]);

  const planets = [
    { name: 'Mercury', distance: 160, size: 6, color: 'from-slate-400 to-slate-500', duration: 15, x: x1, y: y1 },
    { name: 'Venus', distance: 240, size: 10, color: 'from-orange-200 to-orange-400', duration: 25, x: x1, y: y1 },
    { name: 'Earth', distance: 340, size: 12, color: 'from-blue-400 to-blue-600', duration: 35, x: x2, y: y2 },
    { name: 'Mars', distance: 420, size: 8, color: 'from-red-400 to-red-600', duration: 45, x: x2, y: y2 },
    { name: 'Jupiter', distance: 580, size: 28, color: 'from-orange-300 to-amber-700', duration: 80, x: x2, y: y2 },
    { name: 'Saturn', distance: 780, size: 24, color: 'from-yellow-200 to-yellow-600', duration: 120, x: x3, y: y3, hasRing: true },
    { name: 'Uranus', distance: 980, size: 18, color: 'from-cyan-300 to-cyan-500', duration: 160, x: x3, y: y3 },
    { name: 'Neptune', distance: 1150, size: 16, color: 'from-blue-600 to-indigo-700', duration: 200, x: x3, y: y3 },
  ];

  // Static stars to prevent hydration mismatch
  const [stars, setStars] = useState("");
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map(() => {
      return `${Math.floor(Math.random() * 100)}vw ${Math.floor(Math.random() * 100)}vh ${Math.random() * 2}px ${Math.random() > 0.8 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}`;
    }).join(', ');
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden bg-[#0A0F1C]">
      {/* Stars Background */}
      {mounted && stars && (
        <motion.div style={{ x: x1, y: y1 }} className="absolute inset-0 opacity-60">
          <div className="w-1 h-1 rounded-full bg-transparent" style={{ boxShadow: stars }} />
        </motion.div>
      )}

      {/* Nebula / Galaxy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px] opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[100px] opacity-30" />

      {/* The Sun */}
      <motion.div style={{ x: x1, y: y1 }} className="absolute w-40 h-40 rounded-full bg-amber-500/20 blur-3xl" />
      <motion.div style={{ x: x1, y: y1 }} className="absolute w-20 h-20 rounded-full bg-yellow-300/40 blur-xl" />
      <motion.div style={{ x: x1, y: y1 }} className="absolute w-12 h-12 rounded-full bg-white blur-[2px] shadow-[0_0_60px_rgba(252,211,77,1)]" />

      {/* Planets and Orbits */}
      {planets.map((p, i) => (
        <motion.div
          key={p.name}
          style={{ x: p.x, y: p.y, width: p.distance, height: p.distance }}
          animate={{ rotate: 360 }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-slate-500/20 flex items-center justify-center"
        >
          {i % 2 === 0 && <div className="absolute inset-0 rounded-full border border-dashed border-slate-400/10" />}
          
          <div 
            className={`absolute rounded-full bg-gradient-to-br ${p.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
            style={{ 
              width: p.size, height: p.size,
              top: `calc(50% - ${p.size/2}px)`, 
              left: -p.size/2 
            }}
          >
            {p.hasRing && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[40%] rounded-full border-2 border-yellow-200/50 rotate-[20deg]" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <section 
      className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#0A0F1C]"
      onMouseMove={handleMouseMove}
    >
      <SolarSystem mouseX={mouseX} mouseY={mouseY} />

      <div className="section-container relative z-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-semibold mb-8 shadow-2xl">
          <Clock className="w-4 h-4 text-primary" />
          Your website delivered in 24 hours — guaranteed
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-balance drop-shadow-lg">
          Custom Website for<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Your Business</span><br />
          Ready in 24 Hours
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          I build <strong className="text-white">professional marketing websites</strong> for businesses that want to grow online — fast.
          No templates. No waiting weeks. <strong className="text-white">Just a great website, delivered in one day.</strong>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/contact" className="btn-primary text-base px-10 py-4 shadow-xl shadow-primary/20">
            Get My Website Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/#our-work" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-10 py-4 backdrop-blur-sm">
            See What I Build
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4">
          {[
            { icon: CheckCircle, label: "No templates — 100% custom" },
            { icon: Zap, label: "Ready in 24 hours" },
            { icon: Star, label: "30+ happy businesses" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm text-sm text-slate-300">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function OurWorkSection() {
  return (
    <section id="our-work" className="py-24 bg-white dark:bg-[#0A0F1C]">
      <div className="section-container">
        <SectionTitle badge="Our Work" title="Everything I Build for " highlight="Your Business"
          subtitle="From marketing sites to mobile apps and e-commerce stores — I cover the full spectrum of digital products." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workTypes.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 group cursor-default relative overflow-hidden">
              {item.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{item.badge}</span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
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

export function ProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">The 24hr Process</span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-balance">
            From Idea to Live Website<br />in Just 24 Hours
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliverySteps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-black mx-auto mb-5">{s.step}</div>
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
            </div>
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

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface dark:bg-slate-900/50">
      <div className="section-container">
        <SectionTitle badge="Reviews" title="What Business Owners " highlight="Say"
          subtitle="Real results from real clients who got their website in 24 hours." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
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

export function CtaSection() {
  return (
    <section className="py-24 bg-dark text-white">
      <div className="section-container text-center">
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
          <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-gradient-brand text-white font-bold text-lg hover:opacity-90 hover:shadow-2xl transition-all">
            Get My Website in 24hrs <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-6">No commitments. Tell me about your business and I&apos;ll get started.</p>
        </motion.div>
      </div>
    </section>
  );
}

interface Package {
  _id: string;
  name: string;
  price: number;
  features: string[];
  order: number;
  isPopular: boolean;
}

export function PricingSection({ packages }: { packages: Package[] }) {
  if (!packages || packages.length === 0) return null;
  return (
    <section className="py-24 bg-surface dark:bg-slate-900/50" id="pricing">
      <div className="section-container">
        <SectionTitle badge="Pricing" title="Simple & Transparent " highlight="Packages" subtitle="Affordable plans tailored to get your business online." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card flex flex-col p-8 ${pkg.isPopular ? "border-2 border-primary shadow-2xl relative transform lg:-translate-y-4" : "border border-slate-200 bg-white shadow-lg"}`}
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
                    {pkg.price === 0 ? "Custom" : `₹${pkg.price}`}
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
              <Link href="/contact" className={`w-full py-4 rounded-xl text-center font-bold text-sm transition-all ${pkg.isPopular ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-dark dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
