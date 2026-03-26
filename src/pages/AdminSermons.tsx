import React, { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { sermonsAPI, uploadFile } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { PrimaryButton, SecondaryButton, ErrorAlert } from '../lib/adminUx';
import { Edit2, Trash2, Plus, Music, User, Calendar } from 'lucide-react';

type Sermon = {
  id: string;
  title: string;
  scripture?: string;
  date: string;
  youtubeId?: string;
  audioUrl?: string;
  thumbnail?: string;
  description?: string;
  preacher?: string;
};

export default function AdminSermons({ embed }: { embed?: boolean } = {}) {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Sermon>>({
    title: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sermonsAPI.getAll();
      setSermons(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load sermons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ title: '', date: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setError('Title and date are required');
      return;
    }

    try {
      if (editingId) {
        // Filter out id, createdAt, updatedAt before sending
        const { id, createdAt, updatedAt, ...updateData } = form as any;
        await sermonsAPI.update(editingId, updateData);
      } else {
        await sermonsAPI.create(form);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    }
  };

  const handleAudioUpload = async (file: File) => {
    setUploadingAudio(true);
    try {
      const response = await uploadFile(file);
      const url = response.url || response;
      setForm((prev) => ({ ...prev, audioUrl: url }));
    } catch (err: any) {
      setError(err?.message || 'Audio upload failed');
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    setUploadingThumbnail(true);
    try {
      const response = await uploadFile(file);
      const url = response.url || response;
      setForm((prev) => ({ ...prev, thumbnail: url }));
    } catch (err: any) {
      setError(err?.message || 'Thumbnail upload failed');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleEdit = (s: Sermon) => {
    setEditingId(s.id);
    setForm(s);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sermon?')) return;
    try {
      await sermonsAPI.delete(id);
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Manage Sermons</h1>
              <p className="text-gray-600 text-sm mt-1">Share and manage your sermons</p>
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
              <div className="bg-pink-100 p-2 rounded-lg">
                <Music className="text-pink-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Sermon' : 'New Sermon'}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="Sermon title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <Calendar size={18} className="text-gray-400" />
                  <input
                    type="date"
                    value={form.date?.slice(0, 10) || ''}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="flex-1 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preacher</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <User size={18} className="text-gray-400" />
                  <input
                    value={form.preacher || ''}
                    onChange={(e) => setForm({ ...form, preacher: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="Preacher name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Scripture Reference</label>
                <input
                  value={form.scripture || ''}
                  onChange={(e) => setForm({ ...form, scripture: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="e.g. John 3:16"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube ID</label>
                <input
                  value={form.youtubeId || ''}
                  onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  placeholder="dQw4w9WgXcQ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Audio File</label>
                <div className="space-y-2">
                  <input
                    value={form.audioUrl || ''}
                    onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm"
                    placeholder="https://example.com/audio.mp3"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-500 cursor-pointer transition-colors bg-gray-50 hover:bg-pink-50">
                    {uploadingAudio ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span className="text-sm font-medium">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">Click to upload audio</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleAudioUpload(file);
                          }}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail</label>
                <div className="space-y-2">
                  <input
                    value={form.thumbnail || ''}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-500 cursor-pointer transition-colors bg-gray-50 hover:bg-pink-50">
                    {uploadingThumbnail ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span className="text-sm font-medium">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">Click to upload thumbnail</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleThumbnailUpload(file);
                          }}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  rows={4}
                  placeholder="Sermon details..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update Sermon' : 'Create Sermon'}
                </button>
                {editingId && (
                  <SecondaryButton onClick={resetForm}>Cancel</SecondaryButton>
                )}
              </div>
            </form>
          </motion.section>

          {/* Sermons List Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Sermons <span className="text-gray-500 font-normal">({sermons.length})</span>
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
              {sermons.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-500"
                >
                  <Music size={40} className="mb-3 opacity-50" />
                  <p className="text-sm">No sermons yet. Create one to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {sermons.map((s, idx) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-pink-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-pink-600 transition-colors truncate">
                            {s.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(s.date).toLocaleDateString()}
                            </div>
                            {s.preacher && (
                              <div className="flex items-center gap-1">
                                <User size={14} />
                                {s.preacher}
                              </div>
                            )}
                          </div>
                          {s.scripture && (
                            <p className="text-xs text-gray-600 mt-2">📖 {s.scripture}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(s)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(s.id)}
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
