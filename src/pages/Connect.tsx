import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, BookOpen, MapPin, Clock, Search, Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { usePageMeta } from '../lib/usePageMeta';

export default function Connect() {
  usePageMeta('Connect', 'Get in touch with Praise Apostolic Pentecostals — counseling, Bible study, visit planning, and more.');

  const [formType, setFormType] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formName.trim()) { setFormError('Please enter your name.'); return; }
    if (!formMessage.trim()) { setFormError('Please enter a message.'); return; }
    setFormSubmitted(true);
    setFormName('');
    setFormMessage('');
  };

  return (
    <div>
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 space-y-2 sm:space-y-3 md:space-y-4"
        >
          <span className="text-pap-sand font-bold tracking-widest uppercase text-[8px] sm:text-[9px] md:text-xs lg:text-sm">Next Steps</span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pap-primary">How Can We Help?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            onClick={() => setFormType('counseling')}
            className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] text-left hover:border-pap-sand transition-all group border border-pap-earth/10 hover:border-pap-sand shadow-sm hover:shadow-xl duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: -5 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pap-sand/20 to-pap-sand/5 rounded-2xl flex items-center justify-center text-pap-sand mb-2 sm:mb-3 md:mb-4 lg:mb-8 shadow-md flex-shrink-0"
            >
              <MessageSquare size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </motion.div>
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-1 sm:mb-1.5 md:mb-2 lg:mb-4 text-pap-primary group-hover:text-pap-sand transition-colors leading-tight">Counseling</h3>
            <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-pap-primary/60 mb-2 sm:mb-3 md:mb-4 lg:mb-8 leading-relaxed font-light">Request a session with one of our pastoral counselors.</p>
            <span className="text-pap-primary font-bold flex items-center gap-1.5 sm:gap-2 group-hover:text-pap-sand transition-colors text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">
              Request Session <Calendar size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </span>
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => setFormType('bible-study')}
            className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] text-left hover:border-pap-primary transition-all group border border-pap-earth/10 shadow-sm hover:shadow-xl duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pap-primary/20 to-pap-primary/5 rounded-2xl flex items-center justify-center text-pap-primary mb-2 sm:mb-3 md:mb-4 lg:mb-8 shadow-md flex-shrink-0"
            >
              <BookOpen size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </motion.div>
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-1 sm:mb-1.5 md:mb-2 lg:mb-4 text-pap-primary group-hover:text-pap-sand transition-colors leading-tight">Bible Study</h3>
            <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-pap-primary/60 mb-2 sm:mb-3 md:mb-4 lg:mb-8 leading-relaxed font-light">Join a small group to dive deeper into Apostolic truth.</p>
            <span className="text-pap-primary font-bold flex items-center gap-1.5 sm:gap-2 group-hover:text-pap-sand transition-colors text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">
              Find a Group <Calendar size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </span>
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8 }}
            onClick={() => setFormType('visit')}
            className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] text-left hover:border-pap-earth transition-all group border border-pap-earth/10 shadow-sm hover:shadow-xl duration-300"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: -5 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pap-earth/20 to-pap-earth/5 rounded-2xl flex items-center justify-center text-pap-earth mb-2 sm:mb-3 md:mb-4 lg:mb-8 shadow-md flex-shrink-0"
            >
              <MapPin size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </motion.div>
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-1 sm:mb-1.5 md:mb-2 lg:mb-4 text-pap-primary group-hover:text-pap-sand transition-colors leading-tight">Church Visit</h3>
            <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-pap-primary/60 mb-2 sm:mb-3 md:mb-4 lg:mb-8 leading-relaxed font-light">Let us know you're coming so we can welcome you.</p>
            <span className="text-pap-primary font-bold flex items-center gap-1.5 sm:gap-2 group-hover:text-pap-sand transition-colors text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">
              Plan Visit <Calendar size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </span>
          </motion.button>
        </div>
      </section>

      {/* Find Section */}
      <section className="bg-pap-light py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
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
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-pap-primary mb-2">Connect With Us</h3>
                <p className="text-pap-primary/60 font-light">Follow us on social media for updates, inspiration, and community moments.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="https://www.facebook.com/share/1aCtXYyDg2/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <Facebook size={24} className="text-blue-600 group-hover:text-blue-700" />
                  <span className="font-bold text-blue-900">Follow on Facebook</span>
                </motion.a>
                
                <motion.a 
                  href="https://www.instagram.com/papchurch"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 p-6 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-2xl hover:border-pink-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <Instagram size={24} className="text-pink-600 group-hover:text-pink-700" />
                  <span className="font-bold text-pink-900">Follow on Instagram</span>
                </motion.a>
              </div>
            </div>

            <div className="border-t border-pap-earth/10 pt-8 md:pt-10">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-pap-primary mb-6 md:mb-8">Send a Message</h3>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle size={28} className="text-green-600" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-pap-primary">Message Received!</h4>
                  <p className="text-pap-primary/60 font-light max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you soon.</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2 text-pap-sand font-bold hover:underline transition-all text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-name" className="text-[10px] md:text-xs font-bold text-pap-earth uppercase tracking-widest ml-1">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-4 md:p-5 bg-pap-light/50 border border-pap-earth/10 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-pap-sand outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label htmlFor="contact-message" className="text-[10px] md:text-xs font-bold text-pap-earth uppercase tracking-widest ml-1">Message</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full p-4 md:p-5 bg-pap-light/50 border border-pap-earth/10 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-pap-sand outline-none transition-all"
                      placeholder="How can we pray for you?"
                    />
                  </div>
                  {formError && <p className="text-red-600 text-sm font-medium">{formError}</p>}
                  <button
                    type="submit"
                    className="w-full py-4 md:py-5 bg-pap-primary text-white rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-pap-primary/90 transition-all shadow-xl active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
