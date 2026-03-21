import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, BookOpen, MapPin, Clock, Search, Facebook, Mail, MessageCircle } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function Connect() {
  const [formType, setFormType] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/connect.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Connect</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for prayer, a Bible study, or just want to say hello, we're here for you.
          </p>
        </div>
      </ParallaxSection>

      {/* Action Grid */}
      <section className="section-padding bg-pap-light">
        <div className="text-center mb-16 sm:mb-20 space-y-3 sm:space-y-4">
          <span className="text-pap-sand font-bold tracking-widest uppercase text-xs sm:text-sm">Next Steps</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pap-primary">How Can We Help?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <button 
            onClick={() => setFormType('counseling')}
            className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-left hover:border-pap-sand transition-all group border border-pap-earth/5 shadow-sm hover:shadow-xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-pap-primary">Counseling</h3>
            <p className="text-xs sm:text-sm md:text-base text-pap-primary/50 mb-4 sm:mb-6 md:mb-8 leading-relaxed font-light">Request a session with one of our pastoral counselors.</p>
            <span className="text-pap-primary font-bold flex items-center gap-2 group-hover:text-pap-sand transition-colors text-xs sm:text-sm md:text-base">
              Request Session <Calendar size={18} />
            </span>
          </button>

          <button 
            onClick={() => setFormType('bible-study')}
            className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-left hover:border-pap-primary transition-all group border border-pap-earth/5 shadow-sm hover:shadow-xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pap-primary/10 rounded-2xl flex items-center justify-center text-pap-primary mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-pap-primary">Bible Study</h3>
            <p className="text-xs sm:text-sm md:text-base text-pap-primary/50 mb-4 sm:mb-6 md:mb-8 leading-relaxed font-light">Join a small group to dive deeper into Apostolic truth.</p>
            <span className="text-pap-primary font-bold flex items-center gap-2 group-hover:text-pap-sand transition-colors text-xs sm:text-sm md:text-base">
              Find a Group <Calendar size={18} />
            </span>
          </button>

          <button 
            onClick={() => setFormType('visit')}
            className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-left hover:border-pap-earth transition-all group border border-pap-earth/5 shadow-sm hover:shadow-xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pap-earth/10 rounded-2xl flex items-center justify-center text-pap-earth mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-pap-primary">Church Visit</h3>
            <p className="text-xs sm:text-sm md:text-base text-pap-primary/50 mb-4 sm:mb-6 md:mb-8 leading-relaxed font-light">Let us know you're coming so we can welcome you.</p>
            <span className="text-pap-primary font-bold flex items-center gap-2 group-hover:text-pap-sand transition-colors text-xs sm:text-sm md:text-base">
              Plan Visit <Calendar size={18} />
            </span>
          </button>
        </div>
      </section>

      {/* Find Section */}
      <section className="bg-pap-light py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-pap-primary leading-tight">Find What You Need</h2>
              <p className="text-lg md:text-xl text-pap-primary/60 font-light leading-relaxed">Quickly locate service times, locations, and ministry details.</p>
            </div>

            <div className="space-y-8 md:space-y-10">
              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pap-sand border border-pap-earth/5">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl md:text-2xl text-pap-primary mb-1 md:mb-2">Service Times</h4>
                  <p className="text-pap-primary/50 text-base md:text-lg font-light">Sundays at 10:00 AM & 6:00 PM. Midweek Service on Thursdays at 7:30 PM.</p>
                </div>
              </div>
              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pap-primary border border-pap-earth/5">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl md:text-2xl text-pap-primary mb-1 md:mb-2">Location</h4>
                  <p className="text-pap-primary/50 text-base md:text-lg font-light">123 Apostolic Way, Pentecost City. Ample parking available on the north side.</p>
                </div>
              </div>
              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pap-earth border border-pap-earth/5">
                  <Search size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl md:text-2xl text-pap-primary mb-1 md:mb-2">Ministries</h4>
                  <p className="text-pap-primary/50 text-base md:text-lg font-light">From youth to seniors, find a department that fits your season of life.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-pap-earth/5 space-y-8 md:space-y-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-pap-primary">Send a Message</h3>
            <form className="space-y-6 md:space-y-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-xs font-bold text-pap-earth uppercase tracking-widest ml-1">Name</label>
                <input type="text" className="w-full p-4 md:p-5 bg-pap-light/50 border border-pap-earth/10 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-pap-sand outline-none transition-all" placeholder="Your Name" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] md:text-xs font-bold text-pap-earth uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} className="w-full p-4 md:p-5 bg-pap-light/50 border border-pap-earth/10 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-pap-sand outline-none transition-all" placeholder="How can we pray for you?"></textarea>
              </div>
              <button className="w-full py-4 md:py-5 bg-pap-primary text-white rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-pap-primary/90 transition-all shadow-xl">
                Send Message
              </button>
            </form>

            <div className="pt-10 border-t border-pap-earth/10 space-y-8">
              <h4 className="text-2xl font-serif font-bold text-pap-primary">Connect With Us</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <a href="mailto:hello@pap.church" className="flex flex-col items-center gap-3 p-6 bg-pap-light/30 rounded-2xl hover:bg-pap-sand/10 transition-colors group">
                  <Mail className="text-pap-sand group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-sm font-bold text-pap-primary">Email</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 bg-pap-light/30 rounded-2xl hover:bg-pap-primary/10 transition-colors group">
                  <Facebook className="text-pap-primary group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-sm font-bold text-pap-primary">Facebook</span>
                </a>
                <a href="https://m.me/yourchurch" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-6 bg-pap-light/30 rounded-2xl hover:bg-pap-earth/10 transition-colors group">
                  <MessageCircle className="text-pap-earth group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-sm font-bold text-pap-primary">Messenger</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
