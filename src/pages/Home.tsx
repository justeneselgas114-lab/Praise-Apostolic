import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import SermonHighlight from '../components/SermonHighlight';
import { MINISTRIES } from '../lib/data';
import MinistryCard from '../components/MinistryCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { usePageMeta } from '../lib/usePageMeta';

export default function Home() {
  usePageMeta('Home', 'Praise Apostolic Pentecostals — Experience the depth of Apostolic worship and the warmth of a community rooted in heritage and truth.');

  return (
    <div>
      <Hero />
      
      {/* Quick Info Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-pap-secondary py-6 sm:py-10 md:py-16 px-4 sm:px-6 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center text-white">
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-pap-sand/30 to-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand shadow-lg flex-shrink-0">
              <Clock size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-pap-sand/80 mb-0.5 md:mb-1 leading-tight">Service Times</p>
              <p className="font-serif text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">Sun 9AM & 2PM | Wed 7:30PM</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg flex-shrink-0">
              <MapPin size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-pap-sand/80 mb-0.5 md:mb-1 leading-tight">Our Location</p>
              <p className="font-serif text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">123 Apostolic Way, Pentecost City</p>
            </div>
          </motion.div>
          <div className="flex justify-start md:justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/service-info"
                className="w-full md:w-auto text-center px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-pap-sand to-pap-sand/80 hover:from-pap-sand/90 hover:to-pap-sand/70 text-white border border-pap-sand/30 rounded-full font-bold transition-all text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-widest shadow-lg hover:shadow-xl min-h-[44px] flex items-center justify-center"
              >
                Service Details
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <VideoSection />
      <SermonHighlight />
      
      {/* Ministries Preview */}
      <section className="section-padding bg-pap-light">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 md:mb-16 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1 sm:space-y-2 md:space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-[8px] sm:text-[9px] md:text-sm">Our Community</span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-pap-primary leading-tight">Ministries</h2>
          </div>
          <Link 
            to="/ministries"
            className="flex items-center gap-1.5 sm:gap-2 text-pap-primary font-bold text-xs sm:text-sm md:text-lg hover:text-pap-sand transition-colors group whitespace-nowrap"
          >
            All Departments <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {MINISTRIES.slice(0, 3).map((ministry, idx) => (
            <MinistryCard key={ministry.id} ministry={ministry} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection 
        image="/images/home.jpg"
        heightClassName="py-12 sm:py-20 md:py-32 px-4 sm:px-6"
        overlayClassName="bg-pap-primary/90"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-10 text-center text-white">
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight">New to PAP?</h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed px-2 md:px-4">
            We'd love to meet you! Whether you're joining us online or in person, there's a place for you here in our Apostolic family.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-6 px-2 md:px-4">
            <Link 
              to="/connect"
              className="w-full xs:w-auto px-6 xs:px-8 md:px-10 py-2.5 xs:py-3 md:py-4 lg:py-5 bg-pap-sand text-white rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-lg hover:bg-pap-sand/90 transition-all shadow-2xl active:scale-95 min-h-[44px] flex items-center justify-center"
            >
              Plan Your Visit
            </Link>
            <Link 
              to="/about"
              className="w-full xs:w-auto px-6 xs:px-8 md:px-10 py-2.5 xs:py-3 md:py-4 lg:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-lg hover:bg-white/20 transition-all active:scale-95 min-h-[44px] flex items-center justify-center"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
