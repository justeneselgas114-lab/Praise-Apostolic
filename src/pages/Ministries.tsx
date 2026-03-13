import React from 'react';
import { motion } from 'motion/react';
import { MINISTRIES } from '../lib/data';
import MinistryCard from '../components/MinistryCard';
import ParallaxSection from '../components/ParallaxSection';

export default function Ministries() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/ministries.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Departments</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Every member a minister. Find your place in our Apostolic community.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MINISTRIES.map((ministry, idx) => (
            <MinistryCard key={ministry.id} ministry={ministry} index={idx} />
          ))}
        </div>
      </section>

      {/* Serve CTA */}
      <ParallaxSection 
        image="/images/ministries.jpg"
        heightClassName="py-32 px-6"
        overlayClassName="bg-pap-secondary/90"
      >
        <div className="max-w-6xl mx-auto p-16 md:p-24 rounded-[4rem] text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white">Ready to Serve?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            God has given each of us unique gifts to build up the body of Christ. We'd love to help you find your place in our volunteer teams.
          </p>
          <button className="px-12 py-5 bg-pap-sand text-white rounded-full font-bold text-xl hover:bg-pap-sand/90 transition-all shadow-2xl">
            Join a Serving Team
          </button>
        </div>
      </ParallaxSection>
    </motion.div>
  );
}
