import React from 'react';
import { motion } from 'motion/react';
import { Heart, Globe, Users, ShieldCheck } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function Give() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/give.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Give With Purpose</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="text-sm font-serif italic text-pap-sand">— 2 Corinthians 9:7</p>
        </div>
      </ParallaxSection>

      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-pap-light">
        <div className="space-y-10">
          <h2 className="text-5xl font-serif font-bold text-pap-primary">Why We Give</h2>
          <p className="text-lg text-pap-primary/60 leading-relaxed font-light">
            At PAP, we believe giving is an act of worship. It's a way to show our gratitude for God's provision and to partner in the work He is doing in our city and around the world.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 shrink-0 bg-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand">
                <Globe size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-1">Missions</h4>
                <p className="text-pap-primary/50">Supporting global missionaries and spreading the Apostolic message to the ends of the earth.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 shrink-0 bg-pap-primary/10 rounded-2xl flex items-center justify-center text-pap-primary">
                <Users size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-1">Local Outreach</h4>
                <p className="text-pap-primary/50">Feeding the hungry, supporting local schools, and being a light in our neighborhood.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 shrink-0 bg-pap-earth/10 rounded-2xl flex items-center justify-center text-pap-earth">
                <Heart size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-pap-primary mb-1">Church Growth</h4>
                <p className="text-pap-primary/50">Maintaining our facilities and creating spaces for worship and discipleship.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-pap-earth/5 space-y-10">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-serif font-bold text-pap-primary">Ways to Give</h3>
            <p className="text-pap-primary/50">Secure and simple options for your tithes and offerings.</p>
          </div>

          <div className="space-y-6">
            <button className="w-full py-6 bg-pap-primary text-white rounded-2xl font-bold text-xl hover:bg-pap-primary/90 transition-all flex items-center justify-center gap-3 shadow-xl">
              <ShieldCheck size={28} />
              Give Online Securely
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 border border-pap-earth/10 rounded-2xl text-center bg-pap-light/30">
                <p className="text-xs font-bold text-pap-earth uppercase tracking-widest mb-3">By Text</p>
                <p className="font-bold text-pap-primary text-lg">Text "GIVE" to 77777</p>
              </div>
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
        </div>
      </section>
    </motion.div>
  );
}
