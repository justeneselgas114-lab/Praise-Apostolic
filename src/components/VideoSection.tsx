import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VideoSection() {
  return (
    <section className="bg-pap-secondary py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video border border-white/10"
        >
          {/* In a real app, this would be a video loop */}
          <img
            src="https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=1200&auto=format&fit=crop"
            alt="Discipleship"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-pap-primary/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-white border-b-[12px] border-b-transparent ml-1" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-pap-light leading-tight">
            Rooted in Heritage, <br />
            <span className="text-pap-sand italic">Driven by Mission</span>
          </h2>
          <p className="text-lg text-pap-light/70 leading-relaxed font-light">
            Our mission is simple: to make disciples who love God, love people, and serve the world. We believe that spiritual growth happens best in community, where we can encourage one another and walk together in the light of Christ.
          </p>
          <Link 
            to="/about#mission"
            className="inline-flex items-center gap-3 text-pap-sand font-bold text-base sm:text-lg md:text-xl group"
          >
            Learn About Our Mission
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
