import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { sermonsAPI } from '../lib/api';
import { Play, BookOpen } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { Sermon } from '../lib/types';
import { usePageMeta } from '../lib/usePageMeta';

export default function Sermons() {
  usePageMeta('Sermons', 'Listen to audio messages and watch video sermons from Praise Apostolic Pentecostals.');

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    sermonsAPI
      .getAll()
      .then((data) => {
        setSermons(data ?? []);
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load sermons');
      })
      .finally(() => setLoading(false));
  }, []);

  const audioSermons = sermons.filter((s) => s.audioUrl);
  const videoSermons = sermons.filter((s) => s.youtubeId);

  return (
    <div>
      <ParallaxSection 
        image="/images/sermons.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Sermons</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Listen to the Word of God and grow in Apostolic truth.
          </p>
        </div>
      </ParallaxSection>

      <section className="py-20 md:py-28 px-6 bg-pap-secondary text-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold">Audio Messages</h2>
              <p className="text-xs sm:text-sm md:text-base text-white/70 font-light max-w-xl">Download or stream our latest messages for your daily commute or personal study.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <div className="pap-spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'transparent' }} />
                <p className="text-white/60 font-light">Loading sermons...</p>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-red-300 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                  Try Again
                </button>
              </div>
            ) : audioSermons.length === 0 ? (
              <p className="text-white/60 col-span-full text-center py-16 font-light">No audio sermons available.</p>
            ) : (
              audioSermons.map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.1, 0.4) }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-[2rem] overflow-hidden flex flex-col group hover:border-white/40 hover:from-white/15 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  {s.thumbnail && (
                    <div className="relative aspect-video overflow-hidden bg-pap-primary/20">
                      <img
                        src={s.thumbnail}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pap-primary/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center border border-white/40"
                        >
                          <Play size={24} className="text-white fill-white ml-1" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg md:text-xl text-white group-hover:text-pap-sand transition-colors">{s.title}</h4>
                      {s.preacher && (
                        <p className="text-white/70 text-sm font-medium">{s.preacher}</p>
                      )}
                      {s.scripture && (
                        <p className="text-white/50 text-sm italic">{s.scripture}</p>
                      )}
                    </div>
                    {s.description && (
                      <p className="text-white/60 text-sm leading-relaxed flex-grow">{s.description}</p>
                    )}
                    <div className="w-full mt-auto pt-4 border-t border-white/10">
                      <audio controls src={s.audioUrl} className="w-full h-10 sm:h-12 rounded-lg accent-pap-sand" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-sm">Video Archive</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pap-primary">Latest Video Sermons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <div className="pap-spinner" />
                <p className="text-pap-primary/60 font-light">Loading sermons...</p>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-red-600 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                  Try Again
                </button>
              </div>
            ) : videoSermons.length === 0 ? (
              <p className="text-pap-primary/60 col-span-full text-center py-16 font-light">No video sermons available.</p>
            ) : (
              videoSermons.map((sermon, idx) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.1, 0.4) }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-pap-earth/5 hover:shadow-2xl transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={sermon.thumbnail || 'https://via.placeholder.com/1200x675?text=No+Image'}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-pap-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                        <Play size={32} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-pap-primary">{sermon.title}</h3>
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
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
