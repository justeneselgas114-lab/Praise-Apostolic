import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Ministry } from '../lib/types';

interface MinistryCardProps {
  ministry: Ministry;
  index: number;
  key?: string | number;
}

export default function MinistryCard({ ministry, index }: MinistryCardProps) {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[ministry.icon || 'Users'] || Icons.Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="bg-pap-light p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl active:shadow-lg transition-shadow group border-l-8 border-pap-sand"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-pap-primary/5 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-pap-sand/10 transition-colors">
        <IconComponent className="text-pap-primary group-hover:text-pap-sand transition-colors" size={28} />
      </div>
      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 text-pap-primary">{ministry.name}</h3>
      <p className="text-pap-primary/60 mb-6 md:mb-8 leading-relaxed text-base md:text-lg font-light">
        {ministry.description}
      </p>
      <div className="space-y-3 text-sm font-medium">
        <div className="flex items-center gap-3 text-pap-earth">
          <Icons.Calendar size={18} />
          <span>{ministry.schedule}</span>
        </div>
        {ministry.leader && (
          <div className="flex items-center gap-3 text-pap-earth">
            <Icons.User size={18} />
            <span>Leader: {ministry.leader}</span>
          </div>
        )}
      </div>
      <button className="mt-10 w-full py-4 text-pap-primary font-bold border-2 border-pap-primary/10 rounded-2xl hover:bg-pap-primary hover:text-white transition-all">
        Learn More
      </button>
    </motion.div>
  );
}
