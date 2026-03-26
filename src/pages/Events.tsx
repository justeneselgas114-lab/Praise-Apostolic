import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { eventsAPI } from '../lib/api';
import { Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { ChurchEvent } from '../lib/types';
import { usePageMeta } from '../lib/usePageMeta';

function EventCard({ event, idx, isPast }: { event: ChurchEvent; idx: number; isPast?: boolean; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl border border-pap-earth/10 hover:border-pap-earth/30 flex flex-col md:flex-row gap-10 md:gap-12 items-center group transition-all duration-300 ${isPast ? 'opacity-70' : ''}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-pap-sand/10 to-pap-primary/10 flex items-center justify-center relative shadow-md"
      >
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <Calendar size={80} className="text-pap-sand/30" />
        )}
        {isPast && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-pap-earth/80 text-white text-xs font-bold rounded-full">
            Past Event
          </div>
        )}
      </motion.div>
      <div className="flex-1 space-y-6 w-full">
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-pap-primary group-hover:text-pap-sand transition-colors">{event.title}</h3>
          <p className="text-xs sm:text-sm md:text-lg text-pap-primary/70 font-light leading-relaxed">{event.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-pap-earth/20">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 text-pap-primary/70 group/item hover:text-pap-sand transition-colors"
          >
            <div className="w-10 h-10 bg-pap-sand/20 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-pap-sand" />
            </div>
            <span className="font-semibold">{event.date}</span>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 text-pap-primary/70 group/item hover:text-pap-sand transition-colors"
          >
            <div className="w-10 h-10 bg-pap-sand/20 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-pap-sand" />
            </div>
            <span className="font-semibold">{event.time}</span>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 text-pap-primary/70 group/item hover:text-pap-sand transition-colors sm:col-span-2"
          >
            <div className="w-10 h-10 bg-pap-sand/20 rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-pap-sand" />
            </div>
            <span className="font-semibold">{event.location}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  usePageMeta('Events', 'Stay updated with upcoming fellowships and special services at Praise Apostolic Pentecostals.');

  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    setLoading(true);
    eventsAPI
      .getAll()
      .then((data) => setEvents(data ?? []))
      .catch((err) => setError(err.message || 'Unable to load events.'))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div>
      <ParallaxSection
        image="/images/events.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Events</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Stay updated with our upcoming fellowships and special services.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-5xl mx-auto space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="pap-spinner" />
              <p className="text-pap-primary/60 font-light">Loading events...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <p className="text-red-600 font-medium">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-pap-primary/60 py-16 font-light">No events at the moment. Please check back later.</p>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcoming.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-pap-primary">Upcoming Events</h2>
                    <span className="px-3 py-1 bg-pap-sand/20 text-pap-sand text-xs font-bold rounded-full">{upcoming.length}</span>
                  </div>
                  {upcoming.map((event, idx) => (
                    <EventCard key={event.id} event={event} idx={idx} />
                  ))}
                </div>
              )}

              {upcoming.length === 0 && (
                <p className="text-center text-pap-primary/60 py-8 font-light">No upcoming events at the moment. Check back soon!</p>
              )}

              {/* Past Events */}
              {past.length > 0 && (
                <div className="space-y-8">
                  <button
                    onClick={() => setShowPast(!showPast)}
                    className="flex items-center gap-3 text-pap-primary/70 hover:text-pap-primary transition-colors group"
                  >
                    <h2 className="text-xl sm:text-2xl font-serif font-bold">Past Events</h2>
                    <span className="px-2.5 py-0.5 bg-pap-earth/10 text-pap-earth text-xs font-bold rounded-full">{past.length}</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${showPast ? 'rotate-180' : ''}`} />
                  </button>
                  {showPast && past.map((event, idx) => (
                    <EventCard key={event.id} event={event} idx={idx} isPast />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
