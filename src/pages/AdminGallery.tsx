import React, { useEffect, useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { galleryAPI, uploadFile } from '../lib/api';
import { Trash2, Plus, FolderPlus } from 'lucide-react';

type GalleryItem = {
  id: string;
  folder: string;
  url: string;
  caption?: string;
};

type ConfirmModal = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AdminGallery({ embed }: { embed?: boolean } = {}) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [imageCaption, setImageCaption] = useState('');
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await galleryAPI.getAll();
      setItems(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const folders = Array.from(new Set(items.map((item) => item.folder)));
  const itemsByFolder = (folder: string) => items.filter((item) => item.folder === folder);

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      setError('Folder name is required');
      return;
    }
    if (folders.includes(newFolderName)) {
      setError('Folder already exists');
      return;
    }
    setSelectedFolder(newFolderName);
    setNewFolderName('');
    setError(null);
  };

  const handleAddImage = async (file: File) => {
    if (!selectedFolder) {
      setError('Please select a folder first');
      return;
    }
    
    setUploadingFile(true);
    try {
      const { url } = await uploadFile(file);
      await galleryAPI.create({
        folder: selectedFolder,
        url,
        caption: imageCaption || undefined,
      });
      setImageCaption('');
      load();
    } catch (err: any) {
      setError(err?.message || 'Failed to add image');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDeleteImage = (item: GalleryItem) => {
    showConfirm(
      'Delete Image',
      `Are you sure you want to delete this image?`,
      async () => {
        try {
          await galleryAPI.delete(item.id);
          load();
        } catch (err: any) {
          setError(err?.message || 'Delete failed');
        }
      }
    );
  };

  const handleDeleteFolder = (folder: string) => {
    const folderItems = itemsByFolder(folder);
    showConfirm(
      'Delete Folder',
      `Are you sure you want to delete the "${folder}" folder and all ${folderItems.length} image(s) inside?`,
      async () => {
        try {
          await Promise.all(folderItems.map((item) => galleryAPI.delete(item.id)));
          if (selectedFolder === folder) setSelectedFolder(null);
          load();
        } catch (err: any) {
          setError(err?.message || 'Delete failed');
        }
      }
    );
  };

  return (
    <RequireAuth>
      <div className={embed ? undefined : 'p-6 max-w-7xl mx-auto'}>
        {!embed && (
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-bold">Manage Gallery</h1>
            <p className="text-gray-600 mt-2">Create folders and upload images to organize your gallery</p>
          </div>
        )}

        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Folders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6 space-y-6">
              {/* Create New Folder */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Create New Folder</h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                    placeholder="e.g., Events, Sermons, etc."
                    className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pap-primary"
                  />
                  <button
                    onClick={handleCreateFolder}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-pap-primary text-white rounded-lg font-semibold hover:bg-pap-primary/90 transition-all"
                  >
                    <FolderPlus size={18} />
                    Create Folder
                  </button>
                </div>
              </div>

              {/* Folders List */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {loading ? 'Loading...' : `Folders (${folders.length})`}
                </h2>
                {folders.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No folders yet. Create one to start!</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {folders.map((folder: string) => (
                      <div
                        key={folder}
                        onClick={() => setSelectedFolder(folder)}
                        className={`group p-3 rounded-lg cursor-pointer border-2 transition-all ${
                          selectedFolder === folder
                            ? 'border-pap-primary bg-pap-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{folder}</p>
                            <p className="text-xs text-gray-500">{itemsByFolder(folder).length} images</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFolder(folder);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-red-600 hover:bg-red-50 rounded flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Upload & Images */}
          <div className="lg:col-span-3">
            {selectedFolder ? (
              <div className="space-y-6">
                {/* Upload Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    📁 {selectedFolder}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">Upload images to this folder</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Image Caption (Optional)</label>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="Add a description for this image"
                        className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pap-primary"
                      />
                    </div>

                    <label className="block relative cursor-pointer">
                      <div className="border-2 border-dashed border-pap-primary/30 rounded-lg p-8 text-center hover:border-pap-primary/60 hover:bg-pap-primary/5 transition-all">
                        <div className="flex flex-col items-center gap-2">
                          <Plus size={32} className="text-pap-primary" />
                          <div>
                            <p className="font-semibold text-pap-primary">
                              {uploadingFile ? 'Uploading...' : 'Click to upload an image'}
                            </p>
                            <p className="text-sm text-gray-500">or drag and drop</p>
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAddImage(file);
                        }}
                        disabled={uploadingFile}
                      />
                    </label>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Images in {selectedFolder} ({itemsByFolder(selectedFolder).length})
                  </h3>
                  
                  {itemsByFolder(selectedFolder).length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No images yet. Upload one to get started!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {itemsByFolder(selectedFolder).map((item) => (
                        <div key={item.id} className="group relative rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all">
                          <img
                            src={item.url}
                            alt={item.caption || 'Gallery image'}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteImage(item)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <p className="text-xs text-white">{item.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">📂</div>
                  <h3 className="text-2xl font-semibold text-gray-700">Select a Folder</h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    Choose a folder from the list on the left to start uploading images, or create a new one to get started.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-pap-primary">{confirmModal.title}</h3>
              </div>
              <p className="text-gray-600">{confirmModal.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={confirmModal.onCancel}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
