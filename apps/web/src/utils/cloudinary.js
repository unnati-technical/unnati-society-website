const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dyubgh5k4";

export const cloudinaryImage = (publicId) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};

export const cloudinaryImage2 = (publicId) => {
  // Consolidated to use the primary cloud name
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};