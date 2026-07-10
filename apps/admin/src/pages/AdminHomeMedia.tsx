import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Image as ImageIcon,
  Video as VideoIcon,
  Edit,
  Trash2,
  Save,
  ArrowRight,
  Sparkles,
  Loader2,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { homeMediaApi, HomeMediaItem } from '../api/home-media.api';

interface MediaModalProps {
  onClose: () => void;
  onSave: () => void;
  itemToEdit?: HomeMediaItem | null;
}

const MediaModal: React.FC<MediaModalProps> = ({ onClose, onSave, itemToEdit }) => {
  const [type, setType] = useState<'PHOTO' | 'VIDEO'>('PHOTO');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [displayOrder, setDisplayOrder] = useState('0');
  const [sourceType, setSourceType] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setType(itemToEdit.type as 'PHOTO' | 'VIDEO');
      setTitle(itemToEdit.title || '');
      setSubtitle(itemToEdit.subtitle || '');
      setDisplayOrder(String(itemToEdit.displayOrder));
      setUrl(itemToEdit.url || '');
      setSourceType('url');
    }
  }, [itemToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToEdit) {
      if (sourceType === 'upload' && !file) {
        toast.error('Please select a file to upload');
        return;
      }
      if (sourceType === 'url' && !url) {
        toast.error('Please enter a media URL');
        return;
      }
    }

    setSaving(true);
    const toastId = toast.loading(itemToEdit ? 'Updating asset...' : 'Saving asset...');

    try {
      if (itemToEdit) {
        // Edit flow
        await homeMediaApi.update(itemToEdit.id, {
          type,
          title: title || null,
          subtitle: subtitle || null,
          displayOrder: Number(displayOrder),
        });
        toast.success('Asset updated successfully', { id: toastId });
      } else {
        // Create/Upload flow
        const formData = new FormData();
        formData.append('type', type);
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('displayOrder', displayOrder);
        
        if (sourceType === 'upload' && file) {
          formData.append('file', file);
        } else if (sourceType === 'url' && url) {
          formData.append('url', url);
        }

        await homeMediaApi.create(formData);
        toast.success('Asset saved successfully', { id: toastId });
      }
      onSave();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to save asset', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-8"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">
              {itemToEdit ? 'Edit Hero Asset' : 'Add New Hero Asset'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {itemToEdit ? 'Modify asset details' : 'Upload photos/videos or paste link for the homepage'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!itemToEdit && (
            <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition ${
                  sourceType === 'upload'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setSourceType('upload')}
                disabled={saving}
              >
                Upload File
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition ${
                  sourceType === 'url'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setSourceType('url')}
                disabled={saving}
              >
                Paste URL / Link
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
                Asset Type
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value as 'PHOTO' | 'VIDEO')}
                disabled={saving}
              >
                <option value="PHOTO">Photo (Image)</option>
                <option value="VIDEO">Video (.mp4)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                disabled={saving}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
              Title Overlay (Optional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. EMPOWERING DREAMS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
              Subtitle Overlay (Optional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Revolutionizing Present, Transforming Future"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              disabled={saving}
            />
          </div>

          {!itemToEdit && sourceType === 'upload' && (
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative">
                <input
                  type="file"
                  accept={type === 'PHOTO' ? 'image/*' : 'video/mp4'}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) setFile(selected);
                  }}
                  disabled={saving}
                />
                <Upload size={32} className="text-gray-400 mb-2" />
                <span className="text-xs text-gray-600 font-medium">
                  {file ? file.name : `Select or drag ${type.toLowerCase()} file`}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  {type === 'PHOTO' ? 'JPG, PNG, WebP up to 10MB' : 'MP4 up to 50MB'}
                </span>
              </div>
            </div>
          )}

          {!itemToEdit && sourceType === 'url' && (
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
                Media URL (Cloudinary or Direct Link) *
              </label>
              <input
                type="url"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://res.cloudinary.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={saving}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-75"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Asset
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminHomeMedia: React.FC = () => {
  const [items, setItems] = useState<HomeMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HomeMediaItem | null>(null);

  const fetchItems = async () => {
    try {
      const data = await homeMediaApi.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load home media assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this asset? This will also remove it from Cloudinary.')) {
      return;
    }

    const toastId = toast.loading('Deleting asset...');
    try {
      await homeMediaApi.delete(id);
      toast.success('Asset deleted successfully', { id: toastId });
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete asset', { id: toastId });
    }
  };

  const handleOpenEdit = (item: HomeMediaItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
              Homepage Hero Media
              <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                <Sparkles size={16} />
              </div>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage the videos and photos displaying dynamically on the homepage background hero section.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-[#0B1F5E] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#1E3A8A] transition shadow-lg shadow-blue-900/10"
          >
            <Plus size={16} />
            Add Media Asset
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 size={32} className="animate-spin text-blue-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="text-blue-500" />
            </div>
            <h3 className="text-base font-extrabold text-gray-900">No dynamic hero assets added</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              Currently, the homepage displays a default background video. Upload photos or videos here to enable a dynamic cycling hero display.
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              Upload Your First Asset
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                {/* Media Preview */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
                  {item.type === 'PHOTO' ? (
                    <img
                      src={item.url}
                      alt={item.title || 'Hero Background'}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={item.url}
                      muted
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 ${
                        item.type === 'PHOTO'
                          ? 'bg-blue-500 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {item.type === 'PHOTO' ? (
                        <>
                          <ImageIcon size={10} />
                          Photo
                        </>
                      ) : (
                        <>
                          <VideoIcon size={10} />
                          Video
                        </>
                      )}
                    </span>
                    <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-[2px]">
                      Order: {item.displayOrder}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 bg-white/90 text-gray-700 hover:bg-white rounded-full p-1.5 shadow-sm transition opacity-0 group-hover:opacity-100"
                    title="Open full resolution"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Info & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-sm text-gray-900 truncate">
                      {item.title || <span className="text-gray-400 italic">No Title Overlay</span>}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {item.subtitle || <span className="text-gray-400 italic">No Subtitle Overlay</span>}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 bg-gray-50 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                      title="Edit metadata"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-gray-50 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                      title="Delete asset"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <MediaModal
              onClose={() => setIsModalOpen(false)}
              onSave={fetchItems}
              itemToEdit={selectedItem}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminHomeMedia;
