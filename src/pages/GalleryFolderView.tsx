import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, X, Edit2, Trash2, Upload, Image as ImageIcon, ArrowLeft } from 'lucide-react';
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

export default function GalleryFolderView() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [folder, setFolder] = useState<GalleryFolder | null>(null);
  const { isEditMode } = useEditMode();
  const [showImageForm, setShowImageForm] = useState(false);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const imageFormRef = useRef<HTMLDivElement | null>(null);
  const [newImage, setNewImage] = useState({
    title: '',
    url: '',
    file: null as File | null
  });

  useEffect(() => {
    const savedFolders = localStorage.getItem('pap-gallery-folders');
    let allFolders: GalleryFolder[];
    
    if (savedFolders) {
      allFolders = JSON.parse(savedFolders);
    } else {
      allFolders = INITIAL_FOLDERS;
    }
    
    setFolders(allFolders);
    
    const foundFolder = allFolders.find(f => f.id === folderId);
    if (foundFolder) {
      setFolder(foundFolder);
    }
  }, [folderId]);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || (!newImage.url && !newImage.file) || !folder) {
      alert('Please fill in all required fields');
      return;
    }

    let imageUrl = newImage.url;
    
    // If file is selected, create a local URL
    if (newImage.file) {
      imageUrl = URL.createObjectURL(newImage.file);
    }

    let updatedFolders;
    if (editingImageId) {
      updatedFolders = folders.map(f => {
        if (f.id === folder.id) {
          return {
            ...f,
            images: f.images.map(image =>
              image.id === editingImageId
                ? {
                    ...image,
                    title: newImage.title,
                    url: imageUrl
                  }
                : image
            )
          };
        }
        return f;
      });
      setEditingImageId(null);
    } else {
      updatedFolders = folders.map(f => {
        if (f.id === folder.id) {
          const image: GalleryImage = {
            id: Date.now().toString(),
            title: newImage.title,
            url: imageUrl
          };
          return {
            ...f,
            images: [image, ...f.images]
          };
        }
        return f;
      });
    }

    setFolders(updatedFolders);
    localStorage.setItem('pap-gallery-folders', JSON.stringify(updatedFolders));
    
    // Update folder with new data
    const updatedFolder = updatedFolders.find(f => f.id === folder.id);
    if (updatedFolder) {
      setFolder(updatedFolder);
    }
    
    setNewImage({
      title: '',
      url: '',
      file: null
    });
    setShowImageForm(false);
  };

  const handleEditImage = (image: GalleryImage) => {
    setNewImage({
      title: image.title,
      url: image.url,
      file: null
    });
    setEditingImageId(image.id);
    setShowImageForm(true);

    setTimeout(() => {
      imageFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = imageFormRef.current?.querySelector('input');
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 100);
  };

  const handleDeleteImage = (imageId: string) => {
    if (!folder) return;
    
    if (confirm('Are you sure you want to delete this image?')) {
      const updatedFolders = folders.map(f => {
        if (f.id === folder.id) {
          return {
            ...f,
            images: f.images.filter(image => image.id !== imageId)
          };
        }
        return f;
      });
      
      setFolders(updatedFolders);
      localStorage.setItem('pap-gallery-folders', JSON.stringify(updatedFolders));
      
      // Update folder with new data
      const updatedFolder = updatedFolders.find(f => f.id === folder.id);
      if (updatedFolder) {
        setFolder(updatedFolder);
      }
    }
  };

  const handleCancelImageEdit = () => {
    setEditingImageId(null);
    setNewImage({
      title: '',
      url: '',
      file: null
    });
    setShowImageForm(false);
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'file' && e.target.files) {
      setNewImage({
        ...newImage,
        file: e.target.files[0],
        url: '' // Clear URL when file is selected
      });
    } else {
      setNewImage({
        ...newImage,
        [e.target.name]: e.target.value,
        file: e.target.name === 'url' ? null : newImage.file // Clear file when URL is entered
      });
    }
  };

  if (!folder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ParallaxSection 
          image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2000&auto=format&fit=crop"
          heightClassName="pt-48 pb-32 px-6"
          overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
        >
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
            <h1 className="text-6xl md:text-8xl font-serif font-bold">Folder Not Found</h1>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              The gallery folder you're looking for doesn't exist.
            </p>
            <Link 
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pap-sand text-white rounded-2xl hover:bg-pap-sand/90 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Back to Gallery
            </Link>
          </div>
        </ParallaxSection>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxSection 
        image={folder.images.length > 0 ? folder.images[0].url : "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2000&auto=format&fit=crop"}
        heightClassName="pt-48 pb-32 px-6"
        overlayClassName="bg-gradient-to-b from-pap-primary/80 to-pap-primary/40"
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center text-white">
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/gallery"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Gallery
            </Link>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold">{folder.title}</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Browse through our collection of {folder.title.toLowerCase()} moments.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/60">
            <span className="flex items-center gap-2">
              {folder.images.length} {folder.images.length === 1 ? 'Photo' : 'Photos'}
            </span>
          </div>
        </div>
      </ParallaxSection>

      <section className="section-padding bg-pap-light">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Add Image Button - Only shown in Edit Mode */}
          {isEditMode && (
            <div className="text-center">
              <button
                onClick={() => {
                  setEditingImageId(null);
                  setNewImage({
                    title: '',
                    url: '',
                    file: null
                  });
                  setShowImageForm(!showImageForm);
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
              >
                {showImageForm && !editingImageId ? <X size={20} /> : <Plus size={20} />}
                {showImageForm && !editingImageId ? 'Cancel' : 'Add New Image'}
              </button>
            </div>
          )}

          {/* Add/Edit Image Form */}
          {showImageForm && (
            <motion.div
              ref={imageFormRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-pap-earth/5 max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-serif font-bold text-pap-primary mb-6">{editingImageId ? 'Edit Image' : 'Add New Image'}</h3>
              <form onSubmit={handleAddImage} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-pap-primary mb-2">Image Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newImage.title}
                    onChange={handleImageInputChange}
                    className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pap-primary mb-2">Image Source *</label>
                  <div className="space-y-4">
                    {/* File Upload Option */}
                    <div className="border-2 border-dashed border-pap-earth/30 rounded-xl p-6">
                      <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleImageInputChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-pap-primary/10 flex items-center justify-center">
                          <Upload size={24} className="text-pap-primary/50" />
                        </div>
                        <div className="text-center">
                          <p className="text-pap-primary font-medium">Click to upload image</p>
                          <p className="text-pap-primary/50 text-sm">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </label>
                    </div>
                    
                    {/* File Preview */}
                    {newImage.file && (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(newImage.file)}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setNewImage({ ...newImage, file: null, url: '' })}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    {/* URL Input Option */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-pap-earth/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-pap-primary/60 font-medium">OR</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-pap-primary mb-2 flex items-center gap-2">
                        <ImageIcon size={16} />
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="url"
                        value={newImage.url}
                        onChange={handleImageInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 border border-pap-earth/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand"
                        disabled={!!newImage.file}
                      />
                      {newImage.file && (
                        <p className="text-xs text-pap-primary/50 mt-1">
                          URL input disabled when file is selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancelImageEdit}
                    className="px-6 py-3 border border-pap-earth/20 text-pap-primary rounded-xl hover:bg-pap-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-pap-primary text-white rounded-xl hover:bg-pap-primary/90 transition-colors"
                  >
                    {editingImageId ? 'Update Image' : 'Add Image'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Images Grid */}
          {folder.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {folder.images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden shadow-sm border border-pap-earth/5 group cursor-pointer"
                >
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 className="text-2xl font-serif font-bold text-white">{image.title}</h4>
                  </div>
                  
                  {/* Edit and Delete Buttons - Only shown in Edit Mode */}
                  {isEditMode && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditImage(image);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm text-pap-sand rounded-lg hover:bg-white transition-colors shadow-lg"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
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
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-pap-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={48} className="text-pap-sand" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-pap-primary mb-2">No Images Yet</h3>
              <p className="text-pap-primary/60 mb-6">Start by adding your first image to this folder.</p>
              {isEditMode && (
                <button
                  onClick={() => setShowImageForm(true)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-pap-primary text-white rounded-2xl hover:bg-pap-primary/90 transition-colors font-medium"
                >
                  <Plus size={20} />
                  Add First Image
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
