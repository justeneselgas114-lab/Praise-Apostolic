import React, { useEffect, useState } from 'react';
import { ministriesAPI, uploadFile } from '../lib/api';
import RequireAuth from '../components/RequireAuth';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorAlert, SecondaryButton } from '../lib/adminUx';
import { Edit2, Trash2, Plus, BookOpen, Users, Calendar } from 'lucide-react';

type Ministry = {
  id: string;
  name: string;
  description: string;
  schedule?: string;
  leader?: string;
  contact?: string;
  icon?: string;
  details?: string;
};

export default function AdminMinistries({ embed }: { embed?: boolean } = {}) {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Ministry>>({ name: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ministriesAPI.getAll();
      setMinistries(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load ministries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ name: '', description: '' });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      setError('Name and description are required');
      return;
    }

    try {
      if (editingId) {
        // Filter out id, createdAt, updatedAt before sending
        const { id, createdAt, updatedAt, ...updateData } = form as any;
        await ministriesAPI.update(editingId, updateData);
      } else {
        await ministriesAPI.create(form);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    }
  };

  const handleIconUpload = async (file: File) => {
    setUploadingIcon(true);
    try {
      const { url } = await uploadFile(file);
      setForm((prev) => ({ ...prev, icon: url }));
    } catch (err: any) {
      setError(err?.message || 'Icon upload failed');
    } finally {
      setUploadingIcon(false);
    }
  };

  const handleEdit = (m: Ministry) => {
    setEditingId(m.id);
    setForm(m);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this ministry?')) return;
    try {
      await ministriesAPI.delete(id);
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Manage Ministries</h1>
              <p className="text-gray-600 text-sm mt-1">Organize and manage ministry programs</p>
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
              <div className="bg-purple-100 p-2 rounded-lg">
                <BookOpen className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Ministry' : 'New Ministry'}
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
                <input
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Ministry name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  rows={4}
                  placeholder="Ministry details and purpose..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Leader</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                  <Users size={18} className="text-gray-400" />
                  <input
                    value={form.leader || ''}
                    onChange={(e) => setForm({ ...form, leader: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="Leader name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                  <Calendar size={18} className="text-gray-400" />
                  <input
                    value={form.schedule || ''}
                    onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="e.g. Every Sunday at 10 AM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Info</label>
                <input
                  value={form.contact || ''}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Contact email or phone"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                <div className="space-y-2">
                  <input
                    value={form.icon || ''}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                    placeholder="https://example.com/icon.png"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 cursor-pointer transition-colors bg-gray-50 hover:bg-purple-50">
                    {uploadingIcon ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span className="text-sm font-medium">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">Click to upload icon</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleIconUpload(file);
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
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update Ministry' : 'Create Ministry'}
                </button>
                {editingId && (
                  <SecondaryButton onClick={resetForm}>Cancel</SecondaryButton>
                )}
              </div>
            </form>
          </motion.section>

          {/* Ministries List Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Ministries <span className="text-gray-500 font-normal">({ministries.length})</span>
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
              {ministries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-500"
                >
                  <BookOpen size={40} className="mb-3 opacity-50" />
                  <p className="text-sm">No ministries yet. Create one to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {ministries.map((m, idx) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-purple-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                            {m.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{m.description}</p>
                          {(m.leader || m.schedule) && (
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                              {m.leader && (
                                <div className="flex items-center gap-1">
                                  <Users size={14} />
                                  {m.leader}
                                </div>
                              )}
                              {m.schedule && (
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {m.schedule}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(m)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(m.id)}
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
