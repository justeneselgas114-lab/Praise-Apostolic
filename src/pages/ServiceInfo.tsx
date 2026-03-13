import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Info, Users, ShieldCheck } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';

export default function ServiceInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/service.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Service Info</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about joining us for worship.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-5xl font-serif font-bold text-pap-primary">Worship Schedule</h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-pap-earth/5">
                  <div className="w-14 h-14 shrink-0 bg-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-pap-primary mb-1">Sunday Worship</h4>
                    <p className="text-pap-primary/50 text-lg">10:00 AM & 6:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-pap-earth/5">
                  <div className="w-14 h-14 shrink-0 bg-pap-primary/10 rounded-2xl flex items-center justify-center text-pap-primary">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-pap-primary mb-1">Midweek Service</h4>
                    <p className="text-pap-primary/50 text-lg">Thursdays at 7:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl font-serif font-bold text-pap-primary">What to Expect</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pap-earth/10 rounded-xl flex items-center justify-center text-pap-earth">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-pap-primary">Dress Code</h4>
                  <p className="text-pap-primary/50 leading-relaxed">Come as you are. Whether you prefer formal or casual, you are welcome here.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pap-sand/10 rounded-xl flex items-center justify-center text-pap-sand">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-pap-primary">Worship Style</h4>
                  <p className="text-pap-primary/50 leading-relaxed">Reverent yet vibrant Apostolic worship with a mix of hymns and contemporary songs.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pap-primary/10 rounded-xl flex items-center justify-center text-pap-primary">
                    <Info size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-pap-primary">Preaching</h4>
                  <p className="text-pap-primary/50 leading-relaxed">Biblical, expository preaching focused on Apostolic truth and practical application.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pap-earth/10 rounded-xl flex items-center justify-center text-pap-earth">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-pap-primary">Children</h4>
                  <p className="text-pap-primary/50 leading-relaxed">Dedicated Children's Ministry (Seeds) available during Sunday morning services.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-pap-secondary p-12 rounded-[3rem] text-white space-y-8 shadow-2xl">
              <h3 className="text-4xl font-serif font-bold">Location</h3>
              <div className="flex gap-6">
                <MapPin className="shrink-0 text-pap-sand" size={32} />
                <p className="text-xl font-light leading-relaxed">
                  123 Apostolic Way, <br />
                  Pentecost City, PC 54321
                </p>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                {/* Placeholder for Map */}
                <div className="w-full h-full flex items-center justify-center text-white/20 italic">
                  Interactive Map Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
