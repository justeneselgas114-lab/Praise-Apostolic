import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { galleryAPI } from '../lib/api';

type GalleryItem = {
  id: string;
  folder: string;
  url: string;
  caption?: string;
};

export default function GalleryFolderView() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const folderName = folderId ? decodeURIComponent(folderId) : '';

  useEffect(() => {
    if (!folderName) return;

    setLoading(true);
    setError(null);

    galleryAPI
      .getAll()
      .then((data: GalleryItem[]) => {
        setItems(data.filter((item) => item.folder === folderName));
      })
      .catch((err) => setError(err?.message || 'Unable to load gallery'))
      .finally(() => setLoading(false));
  }, [folderName]);

  const coverImage = items[0]?.url ?? 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2000&auto=format&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection
        image={coverImage}
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">{folderName || 'Gallery'}</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Browse the images shared by our community for this topic.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-serif font-bold text-pap-primary">{folderName || 'Gallery'}</h2>
              <p className="text-pap-primary/60">{items.length} {items.length === 1 ? 'image' : 'images'}</p>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="px-6 py-2 bg-pap-sand text-white rounded-full font-semibold hover:bg-pap-sand/90"
            >
              Back to Gallery
            </button>
          </div>

          {loading ? (
            <p className="text-center text-pap-primary/70">Loading gallery…</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : items.length === 0 ? (
            <p className="text-center text-pap-primary/70">No images found in this folder.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.map((image) => (
                <div key={image.id} className="rounded-[2rem] overflow-hidden shadow-sm border border-pap-earth/5">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-pap-primary mb-2">{image.title}</h3>
                    {image.caption && <p className="text-pap-primary/60 text-sm">{image.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
