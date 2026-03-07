"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  client: string;
  techStack?: string[];
  slug: string;
  createdAt?: string;
  index?: number;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  client,
  techStack = [],
  slug,
  createdAt,
  index = 0,
  className,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("card group overflow-hidden", className)}
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-brand opacity-80 flex items-center justify-center">
            <span className="text-white/50 text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-secondary mb-1">{client}</p>
            <h3 className="text-base font-bold text-dark leading-tight">{title}</h3>
          </div>
          <Link
            href={`/projects/${slug}`}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-200 group-hover:scale-110"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{description}</p>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {createdAt && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
