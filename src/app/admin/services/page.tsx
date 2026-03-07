"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Loader2 } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const ICON_OPTIONS = ["Globe", "LayoutDashboard", "Palette", "Cloud", "ShoppingCart", "ServerCog", "TrendingUp", "LifeBuoy", "Code2", "Shield", "Zap", "Star"];

const EMPTY: Omit<Service, "_id"> = { title: "", description: "", icon: "Code2", order: 0 };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  function openNew() { setEditing(null); setForm(EMPTY); setShowForm(true); }
  function openEdit(svc: Service) { setEditing(svc); setForm({ title: svc.title, description: svc.description, icon: svc.icon, order: svc.order }); setShowForm(true); }
  function close() { setShowForm(false); setEditing(null); }

  async function handleSave() {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/services/${editing._id}` : "/api/services";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    await fetchServices();
    setSaving(false);
    close();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchServices();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark">Services</h2>
          <p className="text-slate-500 text-sm mt-1">Manage the services displayed on the website.</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-400">No services yet. Add your first one!</div>
          )}
          {services.map((svc, i) => (
            <motion.div key={svc._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="admin-card group">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{svc.icon}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(svc._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="font-bold text-dark mb-1">{svc.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2">{svc.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark">{editing ? "Edit Service" : "New Service"}</h3>
                <button onClick={close} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Service name" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." className="input-field resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon</label>
                    <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="input-field">
                      {ICON_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Order</label>
                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} className="input-field" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={close} className="btn-ghost flex-1">Cancel</button>
                  <button onClick={handleSave} disabled={saving || !form.title} className="btn-primary flex-1 disabled:opacity-60">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-dark text-lg mb-2">Delete Service?</h3>
              <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
