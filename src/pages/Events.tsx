import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { eventsAPI } from '../lib/api';
import { Calendar, Clock, MapPin } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { ChurchEvent } from '../lib/types';

export default function Events() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    eventsAPI
      .getAll()
      .then((data) => setEvents(data ?? []))
      .catch((err) => setError(err.message || 'Unable to load events.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image="/images/events.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Events</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Stay updated with our upcoming fellowships and special services.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-5xl mx-auto space-y-12">
          {loading ? (
            <p className="text-center text-pap-primary/70">Loading events…</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-center text-pap-primary/70">No upcoming events at the moment. Please check back later.</p>
          ) : (
            events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-pap-earth/5 flex flex-col md:flex-row gap-12 items-center group"
              >
                <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden bg-pap-light flex items-center justify-center relative">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Calendar size={64} className="text-pap-sand opacity-20" />
                  )}
                </div>
                <div className="flex-1 space-y-6 w-full">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-serif font-bold text-pap-primary">{event.title}</h3>
                    <p className="text-pap-primary/60 text-lg font-light leading-relaxed">{event.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-pap-earth/10">
                    <div className="flex items-center gap-3 text-pap-primary/70">
                      <Calendar size={20} className="text-pap-sand" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-pap-primary/70">
                      <Clock size={20} className="text-pap-sand" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-pap-primary/70 sm:col-span-2">
                      <MapPin size={20} className="text-pap-sand" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
}
