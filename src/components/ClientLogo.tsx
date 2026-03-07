"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClientLogoProps {
  name: string;
  logo?: string;
  industry?: string;
  index?: number;
}

export default function ClientLogo({ name, logo, industry, index = 0 }: ClientLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className={cn(
        "w-32 h-16 rounded-xl border border-slate-200 bg-white flex items-center justify-center transition-all duration-300",
        "group-hover:border-primary/30 group-hover:shadow-card"
      )}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="max-w-[80%] max-h-[60%] object-contain" />
        ) : (
          <span className="text-sm font-bold text-slate-500 text-center px-2 group-hover:text-primary transition-colors">
            {name}
          </span>
        )}
      </div>
      {industry && (
        <span className="text-xs text-slate-400">{industry}</span>
      )}
    </motion.div>
  );
}
