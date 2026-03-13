import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SERMONS } from '../lib/data';
import { Play, Calendar, BookOpen, Music, Plus, X, Edit2, Trash2 } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { Sermon } from '../lib/types';
import { useEditMode } from '../contexts/EditModeContext';

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isEditMode } = useEditMode();
  const [sermonKind, setSermonKind] = useState<'audio' | 'video' | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [newSermon, setNewSermon] = useState<Partial<Sermon>>({
    title: '',
    scripture: '',
    youtubeId: '',
    audioUrl: ''
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pap-sermons');
    if (saved) {
      setSermons(JSON.parse(saved));
    } else {
      setSermons(SERMONS);
    }
  }, []);

  const persist = (items: Sermon[]) => {
    setSermons(items);
    localStorage.setItem('pap-sermons', JSON.stringify(items));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setNewSermon({ ...newSermon, audioUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSermon.title || !newSermon.scripture) {
      alert('Please fill in title and scripture');
      return;
    }
    if (sermonKind === 'audio' && !newSermon.audioUrl && !audioFile) {
      alert('Please provide an audio URL or upload an audio file');
      return;
    }
    if (sermonKind === 'video' && !newSermon.youtubeId) {
      alert('Please provide a YouTube ID');
      return;
    }
    let updated: Sermon[];
    if (editingId) {
      updated = sermons.map(s =>
        s.id === editingId
          ? { ...s, ...newSermon, id: editingId } as Sermon
          : s
      );
      setEditingId(null);
    } else {
      const sermon: Sermon = {
        id: Date.now().toString(),
        title: newSermon.title as string,
        scripture: newSermon.scripture as string,
        date: new Date().toLocaleDateString(),
        youtubeId: sermonKind === 'video' ? newSermon.youtubeId || undefined : undefined,
        audioUrl: sermonKind === 'audio' ? newSermon.audioUrl || undefined : undefined,
        thumbnail:
          sermonKind === 'video' && newSermon.youtubeId
            ? `https://img.youtube.com/vi/${newSermon.youtubeId}/hqdefault.jpg`
            : ''
      };
      updated = [sermon, ...sermons];
    }
    persist(updated);
    setNewSermon({ title: '', scripture: '', youtubeId: '', audioUrl: '' });
    setAudioFile(null);
    setSermonKind(null);
    setShowForm(false);
  };

  const handleEditSermon = (s: Sermon) => {
    setNewSermon({
      title: s.title,
      scripture: s.scripture,
      date: s.date,
      youtubeId: s.youtubeId || '',
      audioUrl: s.audioUrl || ''
    });
    setAudioFile(null); // Reset file input when editing
    setEditingId(s.id);
    setSermonKind(s.audioUrl ? 'audio' : s.youtubeId ? 'video' : null);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = formRef.current?.querySelector('input');
      if (input instanceof HTMLInputElement) input.focus();
    }, 100);
  };

  const handleDeleteSermon = (id: string) => {
    if (confirm('Are you sure you want to delete this sermon?')) {
      const updated = sermons.filter(s => s.id !== id);
      persist(updated);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewSermon({ ...newSermon, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/sermons.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Sermons</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Listen to the Word of God and grow in Apostolic truth.
          </p>
        </div>
      </ParallaxSection>

      {/* Edit Form - Only shown in Edit Mode */}
      {isEditMode && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Add Sermon Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setEditingId(null);
                  setSermonKind(null);
                  setNewSermon({ title: '', scripture: '', youtubeId: '', audioUrl: '' });
                  setAudioFile(null);
                  setShowForm(!showForm);
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
              >
                {showForm && !editingId ? <X size={20} /> : <Plus size={20} />}
                {showForm && !editingId ? 'Cancel' : 'Add New Sermon'}
              </button>
            </div>

            {/* Add/Edit Sermon Form */}
            {showForm && (
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-pap-earth/5"
              >
              <h3 className="text-2xl font-serif font-bold text-pap-primary mb-6">
                {editingId ? 'Edit Sermon' : 'Add New Sermon'}
              </h3>
              <form onSubmit={handleAddSermon} className="space-y-6">
                {/* choose mode if not selected yet */}
                {sermonKind === null && (
                  <div className="flex justify-center gap-6">
                    <button
                      type="button"
                      onClick={() => setSermonKind('audio')}
                      className="px-8 py-3 bg-pap-sand text-white rounded-2xl hover:bg-pap-sand/90 transition-colors font-medium"
                    >
                      Upload Audio
                    </button>
                    <button
                      type="button"
                      onClick={() => setSermonKind('video')}
                      className="px-8 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
                    >
                      Embed YouTube
                    </button>
                  </div>
                )}

                {sermonKind !== null && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-pap-primary mb-2">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={newSermon.title || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-pap-primary mb-2">Scripture *</label>
                        <input
                          type="text"
                          name="scripture"
                          value={newSermon.scripture || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., John 3:16"
                          className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                          required
                        />
                      </div>
                      {sermonKind === 'video' && (
                        <div>
                          <label className="block text-sm font-medium text-pap-primary mb-2">YouTube ID *</label>
                          <input
                            type="text"
                            name="youtubeId"
                            value={newSermon.youtubeId || ''}
                            onChange={handleInputChange}
                            placeholder="dQw4w9WgXcQ"
                            className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                            required
                          />
                        </div>
                      )}
                      {sermonKind === 'audio' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-pap-primary mb-2">Audio Source *</label>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs text-pap-primary/60 mb-1">Option 1: Upload Local File</label>
                              <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-pap-sand file:text-white hover:file:bg-pap-sand/90"
                              />
                              {audioFile && (
                                <p className="text-sm text-green-600 mt-1">Selected: {audioFile.name}</p>
                              )}
                            </div>
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-pap-earth/20"></div>
                              </div>
                              <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-pap-primary/60">OR</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-pap-primary/60 mb-1">Option 2: Audio URL</label>
                              <input
                                type="url"
                                name="audioUrl"
                                value={newSermon.audioUrl && !audioFile ? newSermon.audioUrl : ''}
                                onChange={handleInputChange}
                                placeholder="https://example.com/audio.mp3"
                                className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={() => setSermonKind(null)}
                        className="text-sm text-pap-primary underline"
                      >
                        Change type
                      </button>
                    </div>
                  </>
                )}

                {sermonKind !== null && (
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                        setSermonKind(null);
                        setAudioFile(null);
                      }}
                      className="px-6 py-3 border border-pap-earth/20 text-pap-primary rounded-xl hover:bg-pap-light transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-pap-primary text-white rounded-xl hover:bg-pap-primary/90 transition-colors"
                    >
                      {editingId ? 'Update Sermon' : 'Add Sermon'}
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </div>
      </section>
      )}

      {/* Audio Sermons Section */}
      <section className="py-24 px-6 bg-pap-secondary text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Audio Messages</h2>
              <p className="text-white/60 font-light max-w-xl">Download or stream our latest messages for your daily commute or personal study.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sermons.filter(s => s.audioUrl).length === 0 ? (
              <p className="text-white/60 col-span-3 text-center">No audio sermons available.</p>
            ) : (
              sermons.filter(s => s.audioUrl).map((s) => (
                <div key={s.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-start gap-4 group hover:bg-white/10 transition-all">
                  <div className="w-full">
                    <audio controls src={s.audioUrl} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">{s.title}</h4>
                  </div>
                  {isEditMode && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditSermon(s)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-pap-sand/10 text-pap-sand rounded-lg hover:bg-pap-sand/20 transition-colors text-sm"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSermon(s.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-sm">Video Archive</span>
            <h2 className="text-5xl font-serif font-bold text-pap-primary">Latest Video Sermons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sermons.filter(s => s.youtubeId).map((sermon, idx) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-pap-earth/5 hover:shadow-2xl transition-all group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={sermon.thumbnail || 'https://via.placeholder.com/1200x675?text=No+Image'} 
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-pap-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                    <Play size={32} className="text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-12 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif font-bold text-pap-primary">{sermon.title}</h3>
                  <div className="flex flex-wrap gap-6 text-pap-primary/50 font-light">
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} className="text-pap-sand" />
                      <span>{sermon.scripture}</span>
                    </div>
                  </div>
                </div>
                <p className="text-pap-primary/60 leading-relaxed font-light">
                  Watch the full message and dive deeper into the Word of God.
                </p>
                <a 
                  href={`https://youtube.com/watch?v=${sermon.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-pap-sand font-bold text-lg group/link"
                >
                  Watch Now
                  <Play size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
                {isEditMode && (
                  <div className="flex gap-3 pt-6 border-t border-pap-earth/10">
                    <button
                      onClick={() => handleEditSermon(sermon)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pap-sand/10 text-pap-sand rounded-lg hover:bg-pap-sand/20 transition-colors font-medium text-sm"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSermon(sermon.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
