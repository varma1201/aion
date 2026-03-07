import type { Metadata } from "next";
import { OurWorkSection } from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore the marketing websites, mobile apps, and digital platforms we have built for businesses.",
};

export default function OurWorkPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 dark:via-[#0A0F1C]">
        <div className="absolute -top-40 right-40 w-96 h-96 rounded-full bg-secondary/8 blur-3xl" />
        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark dark:text-white mb-6 text-balance">
            Everything We Build for<br />
            <span className="gradient-text">Your Business</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            From highly converting marketing sites to scaleable application systems.
          </p>
        </div>
      </section>

      {/* Reusing the section layout since it's perfectly structured */}
      <OurWorkSection />
    </div>
  );
}
