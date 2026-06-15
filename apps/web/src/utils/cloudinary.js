const CLOUD_NAME = "dqvxeeedd";

export const cloudinaryImage = (publicId) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};

const CLOUD_NAME2 = "dwxckh5t4";

export const cloudinaryImage2 = (publicId) => {
  return `https://res.cloudinary.com/${CLOUD_NAME2}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${publicId}`;
};