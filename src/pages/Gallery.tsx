import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { galleryAPI } from '../lib/api';
import { usePageMeta } from '../lib/usePageMeta';

type GalleryItem = {
  id: string;
  folder: string;
  url: string;
  caption?: string;
};

type GalleryFolder = {
  id: string;
  title: string;
  images: GalleryItem[];
};

export default function Gallery() {
  usePageMeta('Photo Gallery', 'Browse photos of worship, fellowship, and outreach moments at Praise Apostolic Pentecostals.');

  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    galleryAPI
      .getAll()
      .then((data: GalleryItem[]) => {
        const grouped = new Map<string, GalleryItem[]>();
        data.forEach((item) => {
          const key = item.folder || 'Uncategorized';
          const list = grouped.get(key) ?? [];
          list.push(item);
          grouped.set(key, list);
        });

        setFolders(
          Array.from(grouped.entries()).map(([title, images]) => ({
            id: encodeURIComponent(title),
            title,
            images,
          }))
        );
      })
      .catch((err) => setError(err?.message || 'Unable to load gallery'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <ParallaxSection 
        image="/images/gallery.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-bold">Photo Gallery</h1>
          <p className="text-sm sm:text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Capturing the moments of worship, fellowship, and outreach in our community.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Folders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <div className="pap-spinner" />
                <p className="text-pap-primary/60 font-light">Loading gallery...</p>
              </div>
            ) : error ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-red-600 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90 transition-all text-sm">
                  Try Again
                </button>
              </div>
            ) : folders.length === 0 ? (
              <p className="col-span-full text-center text-pap-primary/60 py-16 font-light">No gallery folders available yet.</p>
            ) : (
              folders.map((folder, idx) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.08, 0.4), duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl active:shadow-lg border border-pap-earth/10 hover:border-pap-sand/30 group cursor-pointer transition-shadow duration-300"
                >
                  <Link to={`/gallery/${folder.id}`} className="w-full h-full block">
                    {/* Folder Cover Image - Show first image or placeholder */}
                    {folder.images.length > 0 ? (
                      <img 
                        src={folder.images[0].url} 
                        alt={folder.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pap-light to-pap-light/50 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-20 h-20 bg-gradient-to-br from-pap-sand/30 to-pap-sand/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
                          >
                            <Plus size={32} className="text-pap-sand" />
                          </motion.div>
                          <p className="text-pap-primary/60 font-medium text-sm">No images yet</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Folder Overlay — always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                      <div className="text-white w-full">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-bold mb-1">{folder.title}</h4>
                        <p className="text-white/85 text-xs sm:text-sm font-light">{folder.images.length} {folder.images.length === 1 ? 'image' : 'images'}</p>
                      </div>
                    </div>
                  </Link>
                  
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
