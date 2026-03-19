import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MinistryCard from '../components/MinistryCard';
import ParallaxSection from '../components/ParallaxSection';
import { ministriesAPI } from '../lib/api';
import { Ministry } from '../lib/types';

export default function Ministries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    ministriesAPI
      .getAll()
      .then((data) => setMinistries(data ?? []))
      .catch((err) => setError(err?.message || 'Unable to load ministries'))
      .finally(() => setLoading(false));
  }, []);

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
          {loading ? (
            <p className="col-span-3 text-center text-pap-primary/70">Loading ministries…</p>
          ) : error ? (
            <p className="col-span-3 text-center text-red-600">{error}</p>
          ) : ministries.length === 0 ? (
            <p className="col-span-3 text-center text-pap-primary/70">No ministries found at this time.</p>
          ) : (
            ministries.map((ministry, idx) => (
              <MinistryCard key={ministry.id} ministry={ministry} index={idx} />
            ))
          )}
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
