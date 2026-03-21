import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { galleryAPI } from '../lib/api';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
              <p className="col-span-3 text-center text-pap-primary/70">Loading gallery…</p>
            ) : error ? (
              <p className="col-span-3 text-center text-red-600">{error}</p>
            ) : folders.length === 0 ? (
              <p className="col-span-3 text-center text-pap-primary/70">No gallery folders available yet.</p>
            ) : (
              folders.map((folder, idx) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden shadow-sm border border-pap-earth/5 group cursor-pointer"
                >
                  <Link to={`/gallery/${folder.id}`}>
                    {/* Folder Cover Image - Show first image or placeholder */}
                    {folder.images.length > 0 ? (
                      <img 
                        src={folder.images[0].url} 
                        alt={folder.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-pap-light flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-pap-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} className="text-pap-sand" />
                          </div>
                          <p className="text-pap-primary/60 font-medium">No images yet</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Folder Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <h4 className="text-2xl font-serif font-bold mb-2">{folder.title}</h4>
                        <p className="text-white/80 text-sm">{folder.images.length} {folder.images.length === 1 ? 'image' : 'images'}</p>
                      </div>
                    </div>
                  </Link>
                  
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
