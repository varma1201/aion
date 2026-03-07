import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { Target, Eye, Rocket, Users, Heart, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Web Design Agency",
  description: "Learn about AionWeb — a dedicated digital solutions team of Next.js React Developers, designers, and strategists building scalable software.",
};

const techStack = [
  "Next.js", "React", "TypeScript", "Node.js",
  "MongoDB", "PostgreSQL", "Tailwind CSS", "Framer Motion",
  "AWS", "Vercel", "Docker", "Figma",
];

const values = [
  { icon: Heart, title: "Client First", desc: "We treat every project as if it were our own business, with full ownership and dedication." },
  { icon: Code2, title: "Quality Code", desc: "Maintainable, well-documented code that you or any team can build on confidently." },
  { icon: Rocket, title: "Timely Delivery", desc: "We respect timelines and communicate proactively to deliver on schedule." },
  { icon: Users, title: "Real Partnership", desc: "We are not just vendors — we become long-term partners in your digital growth." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 dark:via-[#0A0F1C]">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark dark:text-white mb-6 text-balance">
            We Build Digital Products<br />
            <span className="gradient-text">With Purpose</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            AionWeb is a full-service digital studio helping businesses establish and scale their online presence.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white dark:bg-[#0A0F1C]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-dark dark:text-white mb-6">
                About <span className="gradient-text">AionWeb</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                AionWeb is a modern web development and digital solutions company focused on helping
                businesses build strong digital foundations. We started with a simple belief: that
                every business deserves world-class technology, regardless of size.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                From small local businesses stepping into the digital world to fast-growing startups
                needing scalable infrastructure, we have partnered with clients across industries to
                deliver products that are beautiful, functional, and built to last.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We are a remote-first team of engineers, designers, and strategists who share a
                passion for clean code, great design, and real business impact.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-8 text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-dark dark:text-white mb-2">Our Mission</h3>
                <p className="text-slate-500 text-sm">Empower businesses with scalable digital products built with modern tech and clean design.</p>
              </div>
              <div className="card p-8 text-center">
                <Eye className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-dark dark:text-white mb-2">Our Vision</h3>
                <p className="text-slate-500 text-sm">A world where every business has access to world-class digital solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface dark:bg-slate-900/50">
        <div className="section-container">
          <SectionTitle badge="Core Values" title="What We " highlight="Stand For" subtitle="The principles that guide every decision we make." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-dark dark:text-white mb-2">{val.title}</h3>
                <p className="text-slate-500 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white dark:bg-[#0A0F1C]">
        <div className="section-container">
          <SectionTitle badge="Technology" title="Our " highlight="Tech Stack" subtitle="The modern tools and frameworks we use to build performant, scalable products." />
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-semibold hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary/50 dark:hover:bg-primary/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
