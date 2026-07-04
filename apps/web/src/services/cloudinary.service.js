import axios from 'axios';

// Get Cloudinary config from env vars or fallback to existing values to preserve functionality
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'drhkvdtw2';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unnati_preset';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    }
    throw new Error('No secure URL returned from Cloudinary');
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};
