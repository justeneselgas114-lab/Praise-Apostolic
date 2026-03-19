import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '../contexts/EditModeContext';
import Navbar from '../components/Navbar';
import RequireAuth from '../components/RequireAuth';
import AdminEvents from './AdminEvents';
import AdminMinistries from './AdminMinistries';
import AdminSermons from './AdminSermons';
import AdminPastors from './AdminPastors';
import AdminGallery from './AdminGallery';
import AdminUsers from './AdminUsers';
import { motion } from 'motion/react';
import { LogOut, BarChart3, Calendar, BookOpen, Users, Image, Music, Settings } from 'lucide-react';
import {
  eventsAPI,
  ministriesAPI,
  pastorsAPI,
  sermonsAPI,
  galleryAPI,
  usersAPI,
} from '../lib/api';

type Section =
  | 'dashboard'
  | 'events'
  | 'ministries'
  | 'sermons'
  | 'pastors'
  | 'gallery'
  | 'users';

const SECTION_CONFIG: Record<Section, { label: string; icon: React.ReactNode; color: string }> = {
  dashboard: { label: 'Dashboard', icon: <BarChart3 size={20} />, color: 'from-blue-500 to-blue-600' },
  events: { label: 'Events', icon: <Calendar size={20} />, color: 'from-orange-500 to-orange-600' },
  ministries: { label: 'Ministries', icon: <BookOpen size={20} />, color: 'from-purple-500 to-purple-600' },
  sermons: { label: 'Sermons', icon: <Music size={20} />, color: 'from-pink-500 to-pink-600' },
  pastors: { label: 'Pastors', icon: <Users size={20} />, color: 'from-green-500 to-green-600' },
  gallery: { label: 'Gallery', icon: <Image size={20} />, color: 'from-cyan-500 to-cyan-600' },
  users: { label: 'Users', icon: <Settings size={20} />, color: 'from-indigo-500 to-indigo-600' },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useEditMode();

  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [counts, setCounts] = useState({
    pastors: 0,
    ministries: 0,
    sermons: 0,
    events: 0,
    gallery: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pastors, ministries, sermons, events, gallery, users] = (await Promise.all([
        pastorsAPI.getAll(),
        ministriesAPI.getAll(),
        sermonsAPI.getAll(),
        eventsAPI.getAll(),
        galleryAPI.getAll(),
        usersAPI.getAll(),
      ])) as any[];

      setCounts({
        pastors: pastors?.length ?? 0,
        ministries: ministries?.length ?? 0,
        sermons: sermons?.length ?? 0,
        events: events?.length ?? 0,
        gallery: gallery?.length ?? 0,
        users: users?.length ?? 0,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to load dashboard summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/admin');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'events':
        return <AdminEvents embed />;
      case 'ministries':
        return <AdminMinistries embed />;
      case 'sermons':
        return <AdminSermons embed />;
      case 'pastors':
        return <AdminPastors embed />;
      case 'gallery':
        return <AdminGallery embed />;
      case 'users':
        return <AdminUsers embed />;
      default:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome back!</h3>
              <p className="text-sm text-gray-600 max-w-2xl">
                Use the menu on the left to manage content. Your changes are saved directly to the backend.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(['events', 'ministries', 'sermons', 'pastors', 'gallery', 'users'] as const).map((key, idx) => {
                const config = SECTION_CONFIG[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveSection(key)}
                    className="group cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 p-6 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`bg-gradient-to-br ${config.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                        {config.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{config.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{counts[key as keyof typeof counts]}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <RequireAuth>
      <Navbar />
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-gradient-to-br from-pap-primary to-pap-primary/80 shadow-lg p-6 text-white space-y-4"
              >
                <div>
                  <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
                  <p className="text-white/70 text-sm mt-1">Manage your content here</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-200 text-sm"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </motion.div>

              {/* Navigation Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-white shadow-sm border border-gray-100 p-2 space-y-2"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-widest">Menu</h2>
                </div>

                {error && (
                  <div className="mx-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  {(['dashboard', 'events', 'ministries', 'sermons', 'pastors', 'gallery', 'users'] as Section[]).map((key) => {
                    const config = SECTION_CONFIG[key];
                    const isActive = activeSection === key;
                    return (
                      <motion.button
                        key={key}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection(key)}
                        className={`w-full text-left rounded-xl px-4 py-3 transition-all duration-200 font-medium text-sm flex items-center gap-3 ${
                          isActive
                            ? 'bg-gradient-to-r from-pap-primary to-pap-primary/80 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100 transition-opacity'}>
                          {config.icon}
                        </span>
                        <span className="flex-1">{config.label}</span>
                        {key !== 'dashboard' && (
                          <motion.span
                            initial={false}
                            animate={{ scale: isActive ? 1 : 0.9 }}
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                              isActive
                                ? 'bg-white/30 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {counts[key as keyof typeof counts]}
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="px-4 py-3 border-t border-gray-100">
                  <button
                    onClick={loadSummary}
                    disabled={loading}
                    className="text-xs text-pap-primary hover:text-pap-primary/80 font-semibold transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Refreshing…' : 'Refresh Stats'}
                  </button>
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white shadow-sm border border-gray-100 p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`bg-gradient-to-br ${SECTION_CONFIG[activeSection].color} p-3 rounded-xl text-white`}>
                  {SECTION_CONFIG[activeSection].icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{SECTION_CONFIG[activeSection].label}</h2>
              </div>
              {renderSection()}
            </motion.div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
