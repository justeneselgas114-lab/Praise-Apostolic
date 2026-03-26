import React from 'react';
import { motion } from 'motion/react';
import { Heart, Globe, Users, ShieldCheck } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { usePageMeta } from '../lib/usePageMeta';

export default function Give() {
  usePageMeta('Give', 'Support the mission of Praise Apostolic Pentecostals through tithes and offerings.');

  return (
    <div>
      <ParallaxSection 
        image="/images/give.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Give With Purpose</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="text-sm font-serif italic text-pap-sand">— 2 Corinthians 9:7</p>
        </div>
      </ParallaxSection>

      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center bg-pap-light">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-pap-primary">Why We Give</h2>
          <p className="text-lg text-pap-primary/70 leading-relaxed font-light">
            At PAP, we believe giving is an act of worship. It's a way to show our gratitude for God's provision and to partner in the work He is doing in our city and around the world.
          </p>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ x: 10 }}
              className="flex gap-6 p-6 rounded-2xl hover:bg-white/40 transition-all"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="w-14 h-14 shrink-0 bg-gradient-to-br from-pap-sand/30 to-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand shadow-md"
              >
                <Globe size={28} />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-2">Missions</h4>
                <p className="text-pap-primary/60 text-sm md:text-base">Supporting global missionaries and spreading the Apostolic message to the ends of the earth.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ x: 10 }}
              className="flex gap-6 p-6 rounded-2xl hover:bg-white/40 transition-all"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-14 h-14 shrink-0 bg-gradient-to-br from-pap-primary/30 to-pap-primary/10 rounded-2xl flex items-center justify-center text-pap-primary shadow-md"
              >
                <Users size={28} />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-2">Local Outreach</h4>
                <p className="text-pap-primary/60 text-sm md:text-base">Feeding the hungry, supporting local schools, and being a light in our neighborhood.</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ x: 10 }}
              className="flex gap-6 p-6 rounded-2xl hover:bg-white/40 transition-all"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="w-14 h-14 shrink-0 bg-gradient-to-br from-pap-earth/30 to-pap-earth/10 rounded-2xl flex items-center justify-center text-pap-earth shadow-md"
              >
                <Heart size={28} />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-2">Church Growth</h4>
                <p className="text-pap-primary/60 text-sm md:text-base">Maintaining our facilities and creating spaces for worship and discipleship.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white p-8 md:p-16 lg:p-12 rounded-[3rem] shadow-xl hover:shadow-2xl border border-pap-earth/10 space-y-10 transition-all"
        >
          <div className="text-center space-y-4">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-pap-primary">Ways to Give</h3>
            <p className="text-pap-primary/60 font-light">Secure and simple options for your tithes and offerings.</p>
          </div>

          <div className="space-y-6">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(49, 28, 24, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-6 bg-gradient-to-r from-pap-primary to-pap-primary/90 text-white rounded-2xl font-bold text-lg hover:from-pap-primary/95 hover:to-pap-primary/80 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <ShieldCheck size={28} />
              Give Online Securely
            </motion.button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -4 }}
                className="p-8 border border-pap-sand/30 rounded-2xl text-center bg-gradient-to-br from-pap-sand/5 to-transparent hover:border-pap-sand/50 hover:bg-pap-sand/10 transition-all shadow-sm hover:shadow-md"
              >
                <p className="text-xs font-bold text-pap-earth uppercase tracking-widest mb-3">By Text</p>
                <p className="font-bold text-pap-primary text-lg">Text "GIVE" to 77777</p>
              </motion.div>
              <div className="p-8 border border-pap-earth/10 rounded-2xl text-center bg-pap-light/30">
                <p className="text-xs font-bold text-pap-earth uppercase tracking-widest mb-3">In Person</p>
                <p className="font-bold text-pap-primary text-lg">During Services</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-pap-earth/10 text-center">
            <p className="text-sm text-pap-earth font-medium">
              Your financial information is encrypted and handled with the highest security standards.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
