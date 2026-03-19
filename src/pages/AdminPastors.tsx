import React, { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { pastorsAPI, uploadFile } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorAlert, SecondaryButton } from '../lib/adminUx';
import { Edit2, Trash2, Plus, User, Mail, Phone, Briefcase } from 'lucide-react';

type Pastor = {
  id: string;
  name: string;
  role: string;
  shortBio?: string;
  image?: string;
  bio?: string;
  phone?: string;
  email?: string;
};

export default function AdminPastors({ embed }: { embed?: boolean } = {}) {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Pastor>>({ name: '', role: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pastorsAPI.getAll();
      setPastors(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load pastors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ name: '', role: '' });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      setError('Name and role are required');
      return;
    }

    try {
      if (editingId) {
        // Filter out id, createdAt, updatedAt before sending
        const { id, createdAt, updatedAt, ...updateData } = form as any;
        await pastorsAPI.update(editingId, updateData);
      } else {
        await pastorsAPI.create(form);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const { url } = await uploadFile(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err: any) {
      setError(err?.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (p: Pastor) => {
    setEditingId(p.id);
    setForm(p);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this pastor?')) return;
    try {
      await pastorsAPI.delete(id);
      load();
    } catch (err: any) {
      setError(err?.message || 'Delete failed');
    }
  };

  return (
    <RequireAuth>
      <div className={embed ? undefined : 'p-6 max-w-7xl mx-auto'}>
        {!embed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Manage Pastors</h1>
              <p className="text-gray-600 text-sm mt-1">Manage team members and leadership</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <User className="text-green-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Pastor' : 'New Pastor'}
              </h2>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4"
                >
                  <ErrorAlert message={error} />
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <User size={18} className="text-gray-400" />
                  <input
                    value={form.name || ''}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <Briefcase size={18} className="text-gray-400" />
                  <input
                    value={form.role || ''}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="e.g. Senior Pastor, Associate Pastor"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <Mail size={18} className="text-gray-400" />
                  <input
                    type="email"
                    value={form.email || ''}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    value={form.phone || ''}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio</label>
                <textarea
                  value={form.shortBio || ''}
                  onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  rows={2}
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Bio</label>
                <textarea
                  value={form.bio || ''}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  rows={4}
                  placeholder="Full biography..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Photo</label>
                <div className="space-y-2">
                  <input
                    value={form.image || ''}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 cursor-pointer transition-colors bg-gray-50 hover:bg-green-50">
                    {uploadingImage ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span className="text-sm font-medium">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">Click to upload photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update Pastor' : 'Add Pastor'}
                </button>
                {editingId && (
                  <SecondaryButton onClick={resetForm}>Cancel</SecondaryButton>
                )}
              </div>
            </form>
          </motion.section>

          {/* Pastors List Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Pastors <span className="text-gray-500 font-normal">({pastors.length})</span>
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={load}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </motion.button>
            </div>

            <AnimatePresence mode="popLayout">
              {pastors.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-500"
                >
                  <User size={40} className="mb-3 opacity-50" />
                  <p className="text-sm">No pastors yet. Add one to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {pastors.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-green-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors">
                            {p.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Briefcase size={14} />
                              {p.role}
                            </div>
                            {p.email && (
                              <div className="flex items-center gap-1 truncate">
                                <Mail size={14} />
                                <a href={`mailto:${p.email}`} className="truncate hover:text-green-600">
                                  {p.email}
                                </a>
                              </div>
                            )}
                            {p.phone && (
                              <div className="flex items-center gap-1">
                                <Phone size={14} />
                                {p.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(p)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      </div>
    </RequireAuth>
  );
}
