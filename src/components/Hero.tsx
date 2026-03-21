import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-pap-primary">
      {/* Background Image with Overlay */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <img 
          src="/images/home.jpg" 
          alt="Church Worship"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pap-primary/80 to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pap-sand/20 text-pap-sand text-xs font-bold uppercase tracking-widest mb-6 border border-pap-sand/30">
            Praise Apostolic Pentecostals
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-8xl text-pap-light font-serif font-bold mb-6 leading-[1.1] tracking-tight">
            Reverent. Calm. <br />
            <span className="italic text-pap-sand">Grounded.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-pap-light/80 mb-10 max-w-2xl mx-au to font-light leading-relaxed px-4 sm:px-0">
            Experience the depth of Apostolic worship and the warmth of a community rooted in heritage and truth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4 sm:px-0">
            <Link 
              to="/connect"
              className="w-full sm:w-auto px-8 py-3 sm:py-5 sm:px-10 bg-pap-sand text-white rounded-full font-bold text-base sm:text-lg hover:bg-pap-sand/90 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
            >
              <Calendar size={18} />
              Plan Your Visit
            </Link>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 sm:py-5 sm:px-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              Stream Live
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
