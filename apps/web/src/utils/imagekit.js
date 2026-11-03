/**
 * ImageKit URL helpers — migrated from cloudinary.js
 *
 * CLOUD_NAME 1 → ImageKit ID for the main account (drhkvdtw2 → unnati)
 * CLOUD_NAME 2 → ImageKit ID for the secondary account (dwxckh5t4 → unnati2)
 *
 * For backwards compatibility, any existing Cloudinary URLs stored in the DB
 * are served as-is (they still work for old images). New uploads go through ImageKit.
 */

const IK_ENDPOINT  = import.meta.env.VITE_IMAGEKIT_ENDPOINT  || 'https://ik.imagekit.io/zpkfsvgtn';
const IK_ENDPOINT2 = import.meta.env.VITE_IMAGEKIT_ENDPOINT2 || 'https://ik.imagekit.io/zpkfsvgtn';

/**
 * Build an optimized ImageKit URL from a fileId or path.
 * Equivalent to the old imagekitImage(publicId) helper.
 */
export const imagekitImage = (filePathOrId) => {
  return `${IK_ENDPOINT}/${filePathOrId}?tr=w-2560,q-auto,f-auto`;
};

/**
 * Build an optimized ImageKit URL from the secondary account.
 * Equivalent to the old imagekitImage2(publicId) helper.
 */
export const imagekitImage2 = (filePathOrId) => {
  return `${IK_ENDPOINT2}/${filePathOrId}?tr=w-2560,q-auto,f-auto`;
};
