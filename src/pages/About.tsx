import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { pastorsAPI } from '../lib/api';
import TeamCard from '../components/TeamCard';
import { History, Target, Eye } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { Pastor } from '../lib/types';
import { usePageMeta } from '../lib/usePageMeta';

export default function About() {
  usePageMeta('Our Heritage', 'Discover the Apostolic foundations, vision, mission, and pastoral team of Praise Apostolic Pentecostals.');

  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    pastorsAPI
      .getAll()
      .then((data) => {
        setPastors(data ?? []);
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load pastors');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <ParallaxSection 
        image="/images/about.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Our Heritage</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A legacy of faith, a future of hope. Discover the Apostolic foundations that ground our community.
          </p>
        </div>
      </ParallaxSection>

      {/* Vision & Mission */}
      <section id="mission" className="section-padding grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 bg-pap-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl active:shadow-lg border border-pap-earth/5 space-y-6 md:space-y-8 transition-shadow duration-300"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pap-sand/20 to-pap-sand/5 rounded-2xl flex items-center justify-center text-pap-sand shadow-md">
            <Eye size={28} />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-pap-primary">Vision</h3>
          <p className="text-xs sm:text-sm md:text-lg text-pap-primary/60 leading-relaxed font-light">
            To see our city transformed by the Gospel of Jesus Christ, one heart at a time, through the power of the Holy Spirit.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-pap-secondary to-pap-secondary/95 p-8 md:p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl space-y-6 md:space-y-8 text-white transition-shadow duration-300 border border-white/10"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pap-sand/30 to-pap-sand/10 rounded-2xl flex items-center justify-center text-pap-sand shadow-lg">
            <Target size={28} />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">Mission</h3>
          <p className="text-xs sm:text-sm md:text-lg text-white/75 leading-relaxed font-light">
            To make disciples who love God, love people, and serve the world through worship, community, and Apostolic truth.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl active:shadow-lg border border-pap-earth/5 space-y-6 md:space-y-8 transition-shadow duration-300"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pap-earth/20 to-pap-earth/5 rounded-2xl flex items-center justify-center text-pap-earth shadow-md"
          >
            <History size={28} />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-pap-primary">History</h3>
          <p className="text-xs sm:text-sm md:text-lg text-pap-primary/60 leading-relaxed font-light">
            Founded in 1998, PAP began as a small prayer group and has grown into a vibrant family of faith rooted in Pentecostal heritage.
          </p>
        </motion.div>
      </section>

      {/* What We Believe */}
      <section className="section-padding bg-pap-primary text-white">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-3 md:space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-xs md:text-sm">Foundations</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold">What We Believe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-pap-sand">The Word of God</h4>
              <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">We believe the Bible is the inspired, infallible Word of God, our final authority in all matters of faith and conduct.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-pap-sand">The Oneness of God</h4>
              <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">We believe in one God, who was manifested in the flesh as Jesus Christ, for our salvation.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-pap-sand">Salvation</h4>
              <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">We believe in the Apostolic message of repentance, baptism in Jesus' name, and the infilling of the Holy Spirit.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-pap-sand">Christian Living</h4>
              <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">We believe in living a life of holiness, both inwardly and outwardly, as a reflection of God's grace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor's Welcome */}
      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border border-pap-earth/5">
            <img
              src="/images/about.jpg"
              alt="Pastor Samuel Thompson"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pap-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-1 md:mb-2">Dr. Samuel Thompson</h3>
              <p className="text-pap-sand font-bold tracking-widest uppercase text-xs md:text-sm">Senior Pastor</p>
            </div>
          </div>
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-pap-primary leading-tight">A Message from <br /><span className="text-pap-sand italic">Our Pastor</span></h2>
            <div className="space-y-4 md:space-y-6 text-lg md:text-xl text-pap-primary/60 font-light leading-relaxed italic">
              <p>"Welcome to Praise Apostolic Pentecostals. We are a family of believers dedicated to the truth of God's Word and the power of His presence."</p>
              <p>"Our heart is to see every individual experience the life-changing power of Jesus Christ. Whether you are searching for answers or looking for a home, you are welcome here."</p>
              <p>"We invite you to join us as we worship, grow, and serve together. God has a purpose for your life, and we are here to walk with you on that journey."</p>
            </div>
            <div className="pt-4 md:pt-8">
              <p className="font-serif font-bold text-xl md:text-2xl text-pap-primary">— Dr. Samuel Thompson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-pap-light py-16 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-20 space-y-4">
            <span className="text-pap-sand font-bold tracking-widest uppercase text-sm">Leadership</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-pap-primary">Our Pastoral Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <div className="pap-spinner" />
                <p className="text-pap-primary/60 font-light">Loading our pastoral team...</p>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-red-600 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                  Try Again
                </button>
              </div>
            ) : pastors.length === 0 ? (
              <p className="col-span-full text-center text-pap-primary/60 py-16 font-light">No team members available at this time.</p>
            ) : (
              pastors.map((pastor, idx) => (
                <TeamCard key={pastor.id} pastor={pastor} index={idx} />
              ))
            )}
          </div>

          <div className="mt-16 sm:mt-20 md:mt-32 text-center">
            <h3 className="text-3xl font-serif font-bold text-pap-primary mb-6">Want to see our departments?</h3>
            <Link
              to="/ministries"
              className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-pap-primary text-white rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-pap-primary/90 transition-all shadow-xl active:scale-95"
            >
              Explore Our Ministries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
