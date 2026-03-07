"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Loader2, ExternalLink } from "lucide-react";

interface Client {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  testimonial: string;
  testimonialAuthor: string;
  featured: boolean;
}

const EMPTY: Omit<Client, "_id"> = { name: "", logo: "", industry: "", website: "", testimonial: "", testimonialAuthor: "", featured: false };

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  function openNew() { setEditing(null); setForm(EMPTY); setShowForm(true); }
  function openEdit(c: Client) { setEditing(c); setForm({ name: c.name, logo: c.logo, industry: c.industry, website: c.website, testimonial: c.testimonial, testimonialAuthor: c.testimonialAuthor, featured: c.featured }); setShowForm(true); }
  function close() { setShowForm(false); setEditing(null); }

  async function handleSave() {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/clients/${editing._id}` : "/api/clients";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    await fetchClients();
    setSaving(false);
    close();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchClients();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark">Clients</h2>
          <p className="text-slate-500 text-sm mt-1">Manage client profiles and testimonials.</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Client</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.length === 0 && <div className="col-span-full text-center py-20 text-slate-400">No clients yet.</div>}
          {clients.map((client, i) => (
            <motion.div key={client._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="admin-card group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-slate-400 text-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {client.logo ? <img src={client.logo} alt={client.name} className="w-full h-full object-contain" /> : client.name.charAt(0)}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(client)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(client._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  {client.website && <a href={client.website} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ExternalLink className="w-3.5 h-3.5" /></a>}
                </div>
              </div>
              <h3 className="font-bold text-dark mb-0.5">{client.name}</h3>
              {client.industry && <p className="text-xs text-secondary font-medium mb-2">{client.industry}</p>}
              {client.testimonial && <p className="text-xs text-slate-400 line-clamp-2 italic">&ldquo;{client.testimonial}&rdquo;</p>}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark">{editing ? "Edit Client" : "New Client"}</h3>
                <button onClick={close} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Client name" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Industry</label>
                    <input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="e.g. Fitness" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Logo URL</label>
                  <input value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} placeholder="https://..." className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Website</label>
                  <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Testimonial</label>
                  <textarea rows={3} value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} placeholder="Client quote..." className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Testimonial Author</label>
                  <input value={form.testimonialAuthor} onChange={e => setForm({ ...form, testimonialAuthor: e.target.value })} placeholder="Name, Title" className="input-field" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  <span className="text-sm font-medium text-slate-700">Featured client</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button onClick={close} className="btn-ghost flex-1">Cancel</button>
                  <button onClick={handleSave} disabled={saving || !form.name} className="btn-primary flex-1 disabled:opacity-60">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-dark text-lg mb-2">Delete Client?</h3>
              <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
