import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MinistryCard from '../components/MinistryCard';
import ParallaxSection from '../components/ParallaxSection';
import { ministriesAPI } from '../lib/api';
import { Ministry } from '../lib/types';
import { usePageMeta } from '../lib/usePageMeta';

export default function Ministries() {
  usePageMeta('Departments', 'Explore our church ministries and find your place in the Apostolic community.');

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
    <div>
      <ParallaxSection 
        image="/images/ministries.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Departments</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Every member a minister. Find your place in our Apostolic community.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
              <div className="pap-spinner" />
              <p className="text-pap-primary/60 font-light">Loading ministries...</p>
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
              <p className="text-red-600 font-medium">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                Try Again
              </button>
            </div>
          ) : ministries.length === 0 ? (
            <p className="col-span-full text-center text-pap-primary/60 py-16 font-light">No ministries found at this time.</p>
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto p-8 md:p-24 rounded-[3rem] text-center space-y-8 md:space-y-10 relative z-10 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white">Ready to Serve?</h2>
          <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            God has given each of us unique gifts to build up the body of Christ. We'd love to help you find your place in our volunteer teams.
          </p>
          <motion.button 
            whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(182, 130, 67, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-pap-sand to-pap-sand/80 hover:from-pap-sand/95 hover:to-pap-sand/85 text-white rounded-full font-bold text-sm sm:text-lg md:text-xl transition-all shadow-xl"
          >
            Join a Serving Team
          </motion.button>
        </motion.div>
      </ParallaxSection>
    </div>
  );
}
