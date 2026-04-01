import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Info, Users, ShieldCheck } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { usePageMeta } from '../lib/usePageMeta';

export default function ServiceInfo() {
  usePageMeta('Service Info', 'Worship schedule, what to expect, and location details for Praise Apostolic Pentecostals.');

  return (
    <div>
      <ParallaxSection 
        image="/images/service.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Service Info</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about joining us for worship.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pap-primary">Worship Schedule</h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-5 sm:p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-pap-earth/5">
                  <div className="w-14 h-14 shrink-0 bg-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-pap-primary mb-1">Sunday Morning Service</h4>
                    <p className="text-pap-primary/50 text-lg">9:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-6 p-5 sm:p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-pap-earth/5">
                  <div className="w-14 h-14 shrink-0 bg-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-pap-primary mb-1">Sunday Afternoon Service</h4>
                    <p className="text-pap-primary/50 text-lg">2:00 PM (Every first Sunday of the Month)</p>
                  </div>
                </div>
                <div className="flex gap-6 p-5 sm:p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-pap-earth/5">
                  <div className="w-14 h-14 shrink-0 bg-pap-primary/10 rounded-2xl flex items-center justify-center text-pap-primary">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-pap-primary mb-1">Midweek Bible Class - PAP Academy</h4>
                    <p className="text-pap-primary/50 text-lg">Wednesdays at 7:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pap-primary">What to Expect</h2>
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
            <div className="bg-pap-secondary p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-white space-y-8 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">Location</h3>
              <div className="flex gap-6">
                <MapPin className="shrink-0 text-pap-sand" size={32} />
                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed">
                  144 7th St. Countryside Ave, <br />
                  Brgy. Sta Lucia, Pasig, Philippines 1608
                </p>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2!2d121.074!3d14.568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7e4c4a1b1b1%3A0x0!2sBrgy.%20Sta%20Lucia%2C%20Pasig%2C%20Philippines!5e0!3m2!1sen!2sph!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location Map"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
