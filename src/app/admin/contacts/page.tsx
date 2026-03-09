"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Trash2, MailOpen, RefreshCw, Loader2, AlertCircle } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/contacts", { cache: "no-store" });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
           window.location.href = '/admin'; // Native redirect if auth fails completely
           return;
        }
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Contacts fetch error:", e);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  async function markRead(id: string) {
    await fetch(`/api/contacts/${id}`, { method: "PATCH" });
    setContacts(cs => cs.map(c => c._id === id ? { ...c, read: true } : c));
  }

  async function deleteContact(id: string) {
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    setContacts(cs => cs.filter(c => c._id !== id));
  }

  const filtered = filter === "unread" ? contacts.filter(c => !c.read) : contacts;
  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark">Contact Submissions</h2>
          <p className="text-slate-500 text-sm mt-1">
            {unreadCount > 0 ? (
              <span className="text-primary font-semibold">{unreadCount} unread message{unreadCount !== 1 ? "s" : ""}</span>
            ) : "All messages read"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            {(["all", "unread"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium transition-colors ${filter === f ? "bg-primary text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                {f === "all" ? "All" : `Unread (${unreadCount})`}
              </button>
            ))}
          </div>
          <button onClick={fetchContacts} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400">{filter === "unread" ? "No unread messages." : "No messages yet."}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((contact, i) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`admin-card group transition-all ${!contact.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-dark">{contact.name}</span>
                    {!contact.read && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">New</span>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline mb-2 block">{contact.email}</a>
                  <p className="text-sm text-slate-600 leading-relaxed">{contact.message}</p>
                </div>
                <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!contact.read && (
                    <button onClick={() => markRead(contact._id)} title="Mark as read" className="p-2 rounded-lg hover:bg-blue-50 text-blue-500">
                      <MailOpen className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => deleteContact(contact._id)} title="Delete" className="p-2 rounded-lg hover:bg-red-50 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
