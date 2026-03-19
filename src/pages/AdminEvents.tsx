import React, { useEffect, useState } from 'react';
import { eventsAPI, uploadFile } from '../lib/api';
import RequireAuth from '../components/RequireAuth';
import { motion, AnimatePresence } from 'motion/react';
import { PrimaryButton, SecondaryButton, DangerButton, ErrorAlert, SuccessAlert } from '../lib/adminUx';
import { Edit2, Trash2, Plus, Calendar, MapPin, User } from 'lucide-react';

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image?: string;
  details?: string;
  organizer?: string;
};

export default function AdminEvents({ embed }: { embed?: boolean } = {}) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<EventItem>>({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    location: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
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

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      date: new Date().toISOString().slice(0, 10),
      location: '',
      description: '',
    });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location || !form.description) {
      setError('Title, date, location, and description are required');
      return;
    }

    try {
      if (editingId) {
        // Filter out id, createdAt, updatedAt before sending
        const { id, createdAt, updatedAt, ...updateData } = form as any;
        await eventsAPI.update(editingId, updateData);
      } else {
        await eventsAPI.create(form);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    }
  };

  const handleEdit = (event: EventItem) => {
    setEditingId(event.id);
    setForm(event);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      await eventsAPI.delete(id);
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Manage Events</h1>
              <p className="text-gray-600 text-sm mt-1">Create and manage your church events</p>
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
              <div className="bg-orange-100 p-2 rounded-lg">
                <Plus className="text-orange-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Event' : 'New Event'}
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <input
                  value={form.time || ''}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="e.g. 7:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                  <MapPin size={18} className="text-gray-400" />
                  <input
                    value={form.location || ''}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Organizer</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                  <User size={18} className="text-gray-400" />
                  <input
                    value={form.organizer || ''}
                    onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="Organizer name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  rows={4}
                  placeholder="Event details..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                <div className="space-y-2">
                  <input
                    value={form.image || ''}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500 cursor-pointer transition-colors bg-gray-50 hover:bg-orange-50">
                    {uploadingImage ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span className="text-sm font-medium">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">Click to upload image</span>
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
                <PrimaryButton className="flex-1">
                  {editingId ? 'Update Event' : 'Create Event'}
                </PrimaryButton>
                {editingId && (
                  <SecondaryButton onClick={resetForm}>Cancel</SecondaryButton>
                )}
              </div>
            </form>
          </motion.section>

          {/* Events List Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Events <span className="text-gray-500 font-normal">({events.length})</span>
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
              {events.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-500"
                >
                  <Calendar size={40} className="mb-3 opacity-50" />
                  <p className="text-sm">No events yet. Create one to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {events.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-orange-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors truncate">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-1">
                                ⏰ {event.time}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {event.location}
                            </div>
                          </div>
                          {event.description && (
                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(event)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(event.id)}
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
