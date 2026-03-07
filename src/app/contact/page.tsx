"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "aionwebdevelopers@gmail.com", href: "mailto:aionwebdevelopers@gmail.com" },
  { icon: Phone, label: "Call Us", value: "+91 9444341599", href: "tel:+919444341599" },
  { icon: MapPin, label: "Location", value: "Remote-First Company", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 dark:via-[#0A0F1C]">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-secondary/8 blur-3xl" />
        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark dark:text-white mb-6 text-balance">
            Let&apos;s Build Something<br />
            <span className="gradient-text">Great Together</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Fill out the form or reach out directly.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 bg-white dark:bg-[#0A0F1C]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Get in Touch</h2>
              <p className="text-slate-500 text-sm mb-4">
                We typically respond within a few hours. We&apos;d love to learn about your project.
              </p>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-card transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-sm font-semibold text-dark dark:text-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 admin-card"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-primary">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="admin-card space-y-5">
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Send us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us about your project, timeline, and any other details..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                  )}
                  <button type="submit" disabled={status === "loading"} className="btn-primary w-full text-base py-3.5 disabled:opacity-60">
                    {status === "loading" ? "Sending..." : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
