import axios from 'axios';

/**
 * Upload a file directly to ImageKit via the backend API.
 * The backend handles authentication; we never expose the private key here.
 *
 * This replaces the old uploadToImageKit() which hit Cloudinary's API directly
 * using an unsigned upload preset (which is a security risk).
 */
export const uploadToImageKit = async (file, folder = 'uploads') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data && response.data.url) {
      return response.data.url;
    }
    throw new Error('No URL returned from server');
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

