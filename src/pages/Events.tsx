import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EVENTS } from '../lib/data';
import { Calendar, Clock, MapPin, Plus, X, Edit2, Trash2 } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { ChurchEvent } from '../lib/types';
import { useEditMode } from '../contexts/EditModeContext';

export default function Events() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isEditMode } = useEditMode();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('pap-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(EVENTS);
    }
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedEvents;
    if (editingId) {
      updatedEvents = events.map(event =>
        event.id === editingId
          ? {
              ...event,
              title: newEvent.title,
              date: newEvent.date,
              time: newEvent.time,
              location: newEvent.location,
              description: newEvent.description,
              image: newEvent.image || undefined
            }
          : event
      );
      setEditingId(null);
    } else {
      const event: ChurchEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        description: newEvent.description,
        image: newEvent.image || undefined
      };
      updatedEvents = [event, ...events];
    }

    setEvents(updatedEvents);
    localStorage.setItem('pap-events', JSON.stringify(updatedEvents));
    
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: ''
    });
    setShowForm(false);
  };

  const handleEditEvent = (event: ChurchEvent) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      image: event.image || ''
    });
    setEditingId(event.id);
    setShowForm(true);

    // after state updates, scroll form into view
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // focus first input if possible
      const input = formRef.current?.querySelector('input');
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 100);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('pap-events', JSON.stringify(updatedEvents));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };
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
          {/* Add Event Button - Only shown in Edit Mode */}
          {isEditMode && (
            <div className="text-center">
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewEvent({
                    title: '',
                    date: '',
                    time: '',
                    location: '',
                    description: '',
                    image: ''
                  });
                  setShowForm(!showForm);
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
              >
                {showForm && !editingId ? <X size={20} /> : <Plus size={20} />}
                {showForm && !editingId ? 'Cancel' : 'Add New Event'}
              </button>
            </div>
          )}

          {/* Add/Edit Event Form */}
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-pap-earth/5"
            >
              <h3 className="text-2xl font-serif font-bold text-pap-primary mb-6">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
              <form onSubmit={handleAddEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-pap-primary mb-2">Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pap-primary mb-2">Date *</label>
                    <input
                      type="text"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      placeholder="e.g., March 15, 2026"
                      className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pap-primary mb-2">Time *</label>
                    <input
                      type="text"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      placeholder="e.g., 6:00 PM"
                      className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pap-primary mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Church Hall"
                      className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pap-primary mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pap-primary mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    name="image"
                    value={newEvent.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-pap-earth/20 text-pap-primary rounded-xl hover:bg-pap-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-pap-primary text-white rounded-xl hover:bg-pap-primary/90 transition-colors"
                  >
                    {editingId ? 'Update Event' : 'Add Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Events List */}
          {events.map((event, idx) => (
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

                {/* Edit and Delete Buttons - Only shown in Edit Mode */}
                {isEditMode && (
                  <div className="flex gap-3 pt-6 border-t border-pap-earth/10">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pap-sand/10 text-pap-sand rounded-lg hover:bg-pap-sand/20 transition-colors font-medium text-sm"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
