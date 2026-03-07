"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Loader2, Save, X, PlusCircle } from "lucide-react";

interface Package {
  _id: string;
  name: string;
  price: number;
  features: string[];
  order: number;
  isPopular: boolean;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Package>>({});
  const [isCreating, setIsCreating] = useState(false);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const handleCreate = async () => {
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Package",
        price: 0,
        features: ["Feature 1"],
        order: packages.length + 1,
        isPopular: false
      }),
    });
    if (res.ok) fetchPackages();
  };

  const handleSave = async (id: string) => {
    await fetch(`/api/packages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    fetchPackages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    await fetch(`/api/packages/${id}`, { method: "DELETE" });
    fetchPackages();
  };

  const addFeature = () => {
    setEditForm({ ...editForm, features: [...(editForm.features || []), "New Feature"] });
  };

  const updateFeature = (index: number, val: string) => {
    const newFeatures = [...(editForm.features || [])];
    newFeatures[index] = val;
    setEditForm({ ...editForm, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = (editForm.features || []).filter((_, i) => i !== index);
    setEditForm({ ...editForm, features: newFeatures });
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark">Pricing Packages</h2>
          <p className="text-slate-500 text-sm mt-1">Manage the pricing tiers shown on the homepage</p>
        </div>
        <button onClick={handleCreate} className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          editingId === pkg._id ? (
            <div key={pkg._id} className="admin-card border border-primary/20 shadow-xl shadow-primary/5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Package Name</label>
                  <input type="text" value={editForm.name || ""} onChange={e => setEditForm(f => ({...f, name: e.target.value}))} className="w-full px-3 py-2 border border-slate-200 text-dark rounded-lg focus:border-primary outline-none" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Price (₹)</label>
                    <input type="number" value={editForm.price || 0} onChange={e => setEditForm(f => ({...f, price: Number(e.target.value)}))} className="w-full px-3 py-2 border border-slate-200 text-dark rounded-lg focus:border-primary outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Order</label>
                    <input type="number" value={editForm.order || 0} onChange={e => setEditForm(f => ({...f, order: Number(e.target.value)}))} className="w-full px-3 py-2 border border-slate-200 text-dark rounded-lg focus:border-primary outline-none" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-dark font-medium cursor-pointer">
                  <input type="checkbox" checked={editForm.isPopular || false} onChange={e => setEditForm(f => ({...f, isPopular: e.target.checked}))} className="rounded border-slate-300 text-primary focus:ring-primary" />
                  Mark as Popular
                </label>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-2 block flex items-center justify-between">
                    Features
                    <button onClick={addFeature} className="text-primary hover:bg-primary/10 p-1 rounded"><PlusCircle className="w-4 h-4" /></button>
                  </label>
                  <div className="space-y-2">
                    {(editForm.features || []).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={feat} onChange={e => updateFeature(idx, e.target.value)} className="flex-1 text-dark text-sm px-2 py-1 border border-slate-200 rounded-lg focus:border-primary outline-none" />
                        <button onClick={() => removeFeature(idx)} className="text-red-400 p-1 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button onClick={() => handleSave(pkg._id)} className="flex-1 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90">Save</button>
                  <button onClick={() => setEditingId(null)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <motion.div key={pkg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`admin-card flex flex-col ${pkg.isPopular ? "border-2 border-primary" : ""}`}>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {pkg.isPopular && <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full mb-2 inline-block">Popular</span>}
                    <h3 className="font-bold text-lg text-dark">{pkg.name}</h3>
                    <p className="text-3xl font-black text-dark mt-1">₹{pkg.price}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">Order: {pkg.order}</span>
                </div>
                
                <ul className="space-y-2 mt-6 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button onClick={() => { setEditingId(pkg._id); setEditForm(pkg); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(pkg._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}
