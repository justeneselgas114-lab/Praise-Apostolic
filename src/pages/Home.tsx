import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import SermonHighlight from '../components/SermonHighlight';
import { MINISTRIES, SERMONS } from '../lib/data';
import MinistryCard from '../components/MinistryCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      
      {/* Quick Info Bar */}
      <section className="bg-pap-secondary py-8 md:py-12 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center text-white">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-pap-sand/20 rounded-xl flex items-center justify-center text-pap-sand">
              <Clock size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-pap-sand mb-0.5 md:mb-1">Service Times</p>
              <p className="font-serif text-base md:text-lg">Sun 10AM & 6PM | Thu 7:30PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-pap-primary/20 rounded-xl flex items-center justify-center text-pap-primary border border-white/10">
              <MapPin size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-pap-sand mb-0.5 md:mb-1">Our Location</p>
              <p className="font-serif text-base md:text-lg">123 Apostolic Way, Pentecost City</p>
            </div>
          </div>
          <div className="flex justify-start md:justify-end">
            <Link 
              to="/service-info"
              className="w-full md:w-auto text-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest"
            >
              Service Details
            </Link>
          </div>
        </div>
      </section>

      <VideoSection />
      <SermonHighlight />
      
      {/* Ministries Preview */}
      <section className="section-padding bg-pap-light">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-[10px] md:text-sm">Our Community</span>
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-pap-primary leading-tight">Ministries</h2>
          </div>
          <Link 
            to="/ministries"
            className="flex items-center gap-2 text-pap-primary font-bold text-sm md:text-lg hover:text-pap-sand transition-colors group"
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
        heightClassName="py-20 md:py-32 px-6"
        overlayClassName="bg-pap-primary/90"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-10 text-center text-white">
          <h2 className="text-3xl md:text-7xl font-serif font-bold leading-tight">New to PAP?</h2>
          <p className="text-base md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed px-2 md:px-4">
            We'd love to meet you! Whether you're joining us online or in person, there's a place for you here in our Apostolic family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-2 md:px-4">
            <Link 
              to="/connect"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-pap-sand text-white rounded-full font-bold text-base md:text-lg hover:bg-pap-sand/90 transition-all shadow-2xl active:scale-95"
            >
              Plan Your Visit
            </Link>
            <Link 
              to="/about"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-base md:text-lg hover:bg-white/20 transition-all active:scale-95"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </ParallaxSection>
    </motion.div>
  );
}
