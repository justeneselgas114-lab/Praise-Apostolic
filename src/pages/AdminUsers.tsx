import React, { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { usersAPI } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorAlert, SecondaryButton } from '../lib/adminUx';
import { Edit2, Trash2, Plus, User, Mail, Phone, Lock } from 'lucide-react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  isActive?: boolean;
};

export default function AdminUsers({ embed }: { embed?: boolean } = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<User> & { password?: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ firstName: '', lastName: '', email: '', password: '' });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      setError('Name and email are required');
      return;
    }

    try {
      const payload = { ...form };
      if (!editingId && !payload.password) {
        setError('Password is required when creating a user');
        return;
      }

      if (editingId) {
        await usersAPI.update(editingId, payload);
      } else {
        await usersAPI.create(payload);
      }
      resetForm();
      load();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setForm({ ...user, password: '' });
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      await usersAPI.delete(id);
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 text-sm mt-1">Manage admin users and permissions</p>
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
              <div className="bg-indigo-100 p-2 rounded-lg">
                <User className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit User' : 'New User'}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  value={form.firstName || ''}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  value={form.lastName || ''}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                  <Mail size={18} className="text-gray-400" />
                  <input
                    type="email"
                    value={form.email || ''}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 outline-none"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {!editingId && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <Lock size={18} className="text-gray-400" />
                    <input
                      type="password"
                      value={form.password || ''}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="flex-1 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive ?? true}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  User is active
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update User' : 'Create User'}
                </button>
                {editingId && (
                  <SecondaryButton onClick={resetForm}>Cancel</SecondaryButton>
                )}
              </div>
            </form>
          </motion.section>

          {/* Users List Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Users <span className="text-gray-500 font-normal">({users.length})</span>
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
              {users.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-500"
                >
                  <User size={40} className="mb-3 opacity-50" />
                  <p className="text-sm">No users yet. Create one to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {users.map((u, idx) => (
                    <motion.div
                      key={u.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {u.firstName} {u.lastName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1 truncate">
                              <Mail size={14} />
                              <a href={`mailto:${u.email}`} className="truncate hover:text-indigo-600">
                                {u.email}
                              </a>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              u.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(u)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(u.id)}
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
