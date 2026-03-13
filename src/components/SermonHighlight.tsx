import React from 'react';
import { motion } from 'motion/react';
import { Youtube, ExternalLink } from 'lucide-react';
import { LATEST_SERMON } from '../lib/data';

export default function SermonHighlight() {
  return (
    <section className="bg-pap-primary py-24 md:py-32 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="space-y-3 md:space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-xs md:text-sm">Latest Teaching</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-pap-light leading-tight">Watch Online</h2>
          </div>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pap-sand font-semibold hover:underline text-sm md:text-base"
          >
            View All Sermons <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10"
          >
            <img 
              src={LATEST_SERMON.thumbnail} 
              alt={LATEST_SERMON.title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-pap-primary/20 group-hover:bg-pap-primary/10 transition-colors flex items-center justify-center">
              <a 
                href={`https://youtube.com/watch?v=${LATEST_SERMON.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-white/20"
              >
                <Youtube size={32} className="text-white md:hidden" />
                <Youtube size={48} className="text-white hidden md:block" />
              </a>
            </div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
              <span className="bg-pap-sand text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 animate-pulse">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                LIVE NOW
              </span>
            </div>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <p className="text-pap-sand font-semibold uppercase tracking-widest text-xs md:text-sm">{LATEST_SERMON.date}</p>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-pap-light">{LATEST_SERMON.title}</h3>
              <p className="text-xl md:text-2xl text-pap-light/60 italic font-light">{LATEST_SERMON.scripture}</p>
            </div>
            <p className="text-pap-light/70 leading-relaxed text-base md:text-lg font-light">
              In this powerful message, we explore what it means to truly walk in the light as He is in the light, and how confession leads to fellowship.
            </p>
            <div className="pt-4 md:pt-6">
              <button className="w-full py-4 md:py-5 border-2 border-pap-sand text-pap-sand font-bold rounded-2xl hover:bg-pap-sand hover:text-white transition-all text-base md:text-lg active:scale-95">
                Study Guide (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
