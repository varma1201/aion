"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { slugify } from "@/lib/utils";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  client: string;
  techStack: string[];
  projectUrl: string;
  featured: boolean;
}

const EMPTY: Omit<Project, "_id"> = { title: "", slug: "", description: "", longDescription: "", image: "", client: "", techStack: [], projectUrl: "", featured: false };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function openNew() { setEditing(null); setForm(EMPTY); setTechInput(""); setShowForm(true); }
  function openEdit(p: Project) {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, description: p.description, longDescription: p.longDescription, image: p.image, client: p.client, techStack: p.techStack || [], projectUrl: p.projectUrl, featured: p.featured });
    setTechInput("");
    setShowForm(true);
  }
  function close() { setShowForm(false); setEditing(null); }

  function addTech() {
    if (!techInput.trim()) return;
    setForm(f => ({ ...f, techStack: [...f.techStack, techInput.trim()] }));
    setTechInput("");
  }

  async function handleSave() {
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    await fetchProjects();
    setSaving(false);
    close();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchProjects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-dark">Projects</h2>
          <p className="text-slate-500 text-sm mt-1">Manage portfolio projects shown on the website.</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Project</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.length === 0 && <div className="col-span-full text-center py-20 text-slate-400">No projects yet.</div>}
          {projects.map((proj, i) => (
            <motion.div key={proj._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="admin-card group flex gap-4">
              <div className="w-24 h-16 rounded-lg bg-gradient-brand flex-shrink-0 overflow-hidden">
                {proj.image && <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-dark text-sm">{proj.title}</h3>
                    <p className="text-xs text-secondary font-medium">{proj.client}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <button onClick={() => openEdit(proj)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteId(proj._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    {proj.projectUrl && <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ExternalLink className="w-3.5 h-3.5" /></a>}
                  </div>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(proj.techStack || []).slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark">{editing ? "Edit Project" : "New Project"}</h3>
                <button onClick={close} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} placeholder="Project title" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Client</label>
                    <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Client name" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
                  <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" className="input-field font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Long Description</label>
                  <textarea rows={3} value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} className="input-field resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Image URL</label>
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Project URL</label>
                    <input value={form.projectUrl} onChange={e => setForm({ ...form, projectUrl: e.target.value })} placeholder="https://..." className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tech Stack</label>
                  <div className="flex gap-2 mb-2">
                    <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="e.g. Next.js" className="input-field flex-1" />
                    <button type="button" onClick={addTech} className="btn-secondary text-sm px-4">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form.techStack.map((t, i) => (
                      <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {t}
                        <button onClick={() => setForm(f => ({ ...f, techStack: f.techStack.filter((_, j) => j !== i) }))} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded border-slate-300 text-primary" />
                  <span className="text-sm font-medium text-slate-700">Featured project</span>
                </label>
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

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-dark text-lg mb-2">Delete Project?</h3>
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
