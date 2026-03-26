import React from 'react';
import { motion } from 'motion/react';
import { Pastor } from '../lib/types';

interface TeamCardProps {
  pastor: Pastor;
  index: number;
  key?: string | number;
}

export default function TeamCard({ pastor, index }: TeamCardProps) {
  const imageUrl = pastor.image || 'https://via.placeholder.com/400x500?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white p-6 rounded-[2.5rem] border border-pap-earth/10 shadow-sm hover:shadow-xl transition-shadow active:shadow-lg"
    >
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 sm:mb-8 shadow-md">
        <img
          src={imageUrl}
          alt={pastor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=' + encodeURIComponent(pastor.name);
          }}
        />
        {/* Bio overlay — always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-pap-primary/90 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6 sm:p-8">
          <p className="text-white text-sm sm:text-base italic leading-relaxed font-light">
            "{pastor.shortBio}"
          </p>
        </div>
      </div>
      <div className="px-2 pb-4">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-pap-primary mb-1">{pastor.name}</h3>
        <div className="w-12 h-1 bg-pap-sand mb-3" />
        <p className="text-pap-earth font-bold uppercase tracking-widest text-xs">{pastor.role}</p>
      </div>
    </motion.div>
  );
}
