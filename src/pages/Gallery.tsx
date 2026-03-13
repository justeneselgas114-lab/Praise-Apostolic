import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection';
import { useEditMode } from '../contexts/EditModeContext';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

interface GalleryFolder {
  id: string;
  title: string;
  images: GalleryImage[];
}

const INITIAL_FOLDERS: GalleryFolder[] = [
  {
    id: '1',
    title: 'Worship',
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop', title: 'Sunday Worship' },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop', title: 'Prayer Service' },
      { id: '1-3', url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop', title: 'Praise & Worship' }
    ]
  },
  {
    id: '2',
    title: 'Fellowship',
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=1200&auto=format&fit=crop', title: 'Community Gathering' },
      { id: '2-2', url: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200&auto=format&fit=crop', title: 'Church Lunch' },
      { id: '2-3', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', title: 'Youth Fellowship' }
    ]
  },
  {
    id: '3',
    title: 'Outreach',
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200&auto=format&fit=crop', title: 'Community Service' },
      { id: '3-2', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop', title: 'Food Distribution' },
      { id: '3-3', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop', title: 'Mission Trip' }
    ]
  }
];

export default function Gallery() {
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isEditMode } = useEditMode();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [newFolder, setNewFolder] = useState({
    title: ''
  });

  useEffect(() => {
    const savedFolders = localStorage.getItem('pap-gallery-folders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      setFolders(INITIAL_FOLDERS);
    }
  }, []);

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolder.title) {
      alert('Please fill in folder title');
      return;
    }

    let updatedFolders;
    if (editingId) {
      updatedFolders = folders.map(folder =>
        folder.id === editingId
          ? {
              ...folder,
              title: newFolder.title
            }
          : folder
      );
      setEditingId(null);
    } else {
      const folder: GalleryFolder = {
        id: Date.now().toString(),
        title: newFolder.title,
        images: []
      };
      updatedFolders = [folder, ...folders];
    }

    setFolders(updatedFolders);
    localStorage.setItem('pap-gallery-folders', JSON.stringify(updatedFolders));
    
    setNewFolder({
      title: ''
    });
    setShowForm(false);
  };

  const handleEditFolder = (folder: GalleryFolder) => {
    setNewFolder({
      title: folder.title
    });
    setEditingId(folder.id);
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = formRef.current?.querySelector('input');
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 100);
  };

  const handleDeleteFolder = (id: string) => {
    if (confirm('Are you sure you want to delete this folder and all its images?')) {
      const updatedFolders = folders.filter(folder => folder.id !== id);
      setFolders(updatedFolders);
      localStorage.setItem('pap-gallery-folders', JSON.stringify(updatedFolders));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewFolder({
      title: ''
    });
    setShowForm(false);
  };

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolder({
      ...newFolder,
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
        image="/images/gallery.jpg"
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-serif font-bold">Photo Gallery</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Capturing the moments of worship, fellowship, and outreach in our community.
          </p>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Add Folder Button - Only shown in Edit Mode */}
          {isEditMode && (
            <div className="text-center">
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewFolder({
                    title: ''
                  });
                  setShowForm(!showForm);
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
              >
                {showForm && !editingId ? <X size={20} /> : <Plus size={20} />}
                {showForm && !editingId ? 'Cancel' : 'Add New Folder'}
              </button>
            </div>
          )}

          {/* Add/Edit Folder Form */}
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-pap-earth/5 max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-serif font-bold text-pap-primary mb-6">{editingId ? 'Edit Folder' : 'Add New Folder'}</h3>
              <form onSubmit={handleAddFolder} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-pap-primary mb-2">Folder Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newFolder.title}
                    onChange={handleFolderInputChange}
                    className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                    required
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
                    {editingId ? 'Update Folder' : 'Add Folder'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Folders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {folders.map((folder, idx) => (
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
                
                {/* Edit and Delete Buttons - Only shown in Edit Mode */}
                {isEditMode && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditFolder(folder);
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm text-pap-sand rounded-lg hover:bg-white transition-colors shadow-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFolder(folder.id);
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg hover:bg-white transition-colors shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
