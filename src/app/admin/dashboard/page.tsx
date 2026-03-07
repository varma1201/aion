"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, FolderKanban, Users, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";

interface Stats {
  services: number;
  projects: number;
  clients: number;
  contacts: number;
  unread: number;
}

const statCards = [
  { key: "services", label: "Services", icon: Code2, color: "from-blue-500 to-blue-600", href: "/admin/services" },
  { key: "projects", label: "Projects", icon: FolderKanban, color: "from-violet-500 to-violet-600", href: "/admin/projects" },
  { key: "clients", label: "Clients", icon: Users, color: "from-emerald-500 to-emerald-600", href: "/admin/clients" },
  { key: "contacts", label: "Messages", icon: MessageSquare, color: "from-rose-500 to-rose-600", href: "/admin/contacts" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, clients: 0, contacts: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then(r => r.json()),
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/clients").then(r => r.json()),
      fetch("/api/contacts").then(r => r.json()),
    ])
      .then(([svcs, projs, clients, contacts]) => {
        setStats({
          services: Array.isArray(svcs) ? svcs.length : 0,
          projects: Array.isArray(projs) ? projs.length : 0,
          clients: Array.isArray(clients) ? clients.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          unread: Array.isArray(contacts) ? contacts.filter((c: { read: boolean }) => !c.read).length : 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-dark">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening with AionWeb.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statCards.map(({ key, label, icon: Icon, color, href }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={href} className="block admin-card hover:shadow-card-hover transition-all -translate-y-0 hover:-translate-y-1 duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {key === "contacts" && stats.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                    {stats.unread} new
                  </span>
                )}
              </div>
              <div className="text-3xl font-black text-dark mb-1">
                {loading ? <span className="animate-pulse bg-slate-200 rounded w-8 h-7 inline-block" /> : stats[key as keyof Stats]}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{label}</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-dark">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/admin/services?new=1", label: "Add Service" },
              { href: "/admin/projects?new=1", label: "Add Project" },
              { href: "/admin/clients?new=1", label: "Add Client" },
              { href: "/admin/contacts", label: "View Messages" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all text-center">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-dark">CMS Status</h3>
          </div>
          <div className="space-y-3">
            {statCards.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
                <span className="text-sm font-bold text-dark">
                  {loading ? "..." : stats[key as keyof Stats]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
