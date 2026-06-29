const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "drhkvdtw2";
const CLOUD_NAME2 = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME2 || "dwxckh5t4";

export const cloudinaryImage = (publicId) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};

export const cloudinaryImage2 = (publicId) => {
  return `https://res.cloudinary.com/${CLOUD_NAME2}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};