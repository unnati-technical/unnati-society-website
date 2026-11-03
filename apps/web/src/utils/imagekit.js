/**
 * ImageKit & Cloudinary URL helpers
 *
 * For backwards compatibility:
 * - Full URLs (e.g. https://ik.imagekit.io/... or https://res.cloudinary.com/...) are served directly.
 * - Structured paths with slashes (e.g. 'Media/Akshar/Babupur/...', 'uploads/...', 'leadership_profiles/...')
 *   are served from the active ImageKit endpoint (zpkfsvgtn).
 * - Legacy flat public IDs without slashes (e.g. 'children_sDay-...', 'rangchakra-...', 'IMG_9836_...')
 *   were originally uploaded to Cloudinary accounts (dqvxeeedd / dwxckh5t4 / dyubgh5k4) and are served from there.
 */

const IK_ENDPOINT  = import.meta.env.VITE_IMAGEKIT_ENDPOINT  || 'https://ik.imagekit.io/zpkfsvgtn';
const IK_ENDPOINT2 = import.meta.env.VITE_IMAGEKIT_ENDPOINT2 || 'https://ik.imagekit.io/zpkfsvgtn';

const CLOUDINARY_1 = 'dqvxeeedd';
const CLOUDINARY_2 = 'dwxckh5t4';

/**
 * Build an optimized image URL.
 * Automatically detects whether an ID is an ImageKit path, full URL, or legacy Cloudinary asset.
 */
export const imagekitImage = (filePathOrId) => {
  if (!filePathOrId) return '';
  if (typeof filePathOrId === 'string' && (filePathOrId.startsWith('http://') || filePathOrId.startsWith('https://'))) {
    return filePathOrId;
  }
  const cleanPath = String(filePathOrId).startsWith('/')
    ? String(filePathOrId).slice(1)
    : String(filePathOrId);

  // If path contains slashes (e.g. "Media/...", "uploads/..."), it's hosted on ImageKit
  if (cleanPath.includes('/')) {
    return `${IK_ENDPOINT}/${cleanPath}?tr=w-2560,q-auto,f-auto`;
  }

  // Handle specific known Cloudinary accounts
  if (cleanPath === 'schlvisit_uw7s37') {
    return `https://res.cloudinary.com/dyubgh5k4/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${cleanPath}`;
  }

  // Legacy flat public IDs without slashes reside on Cloudinary account 1
  return `https://res.cloudinary.com/${CLOUDINARY_1}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${cleanPath}`;
};

/**
 * Build an optimized image URL for secondary account / legacy Cloudinary 2 assets.
 */
export const imagekitImage2 = (filePathOrId) => {
  if (!filePathOrId) return '';
  if (typeof filePathOrId === 'string' && (filePathOrId.startsWith('http://') || filePathOrId.startsWith('https://'))) {
    return filePathOrId;
  }
  const cleanPath = String(filePathOrId).startsWith('/')
    ? String(filePathOrId).slice(1)
    : String(filePathOrId);

  // If path contains slashes, it's hosted on ImageKit
  if (cleanPath.includes('/')) {
    return `${IK_ENDPOINT2}/${cleanPath}?tr=w-2560,q-auto,f-auto`;
  }

  // Legacy flat public IDs without slashes reside on Cloudinary account 2
  return `https://res.cloudinary.com/${CLOUDINARY_2}/image/upload/w_2560,dpr_auto,q_auto:best,f_auto/${cleanPath}`;
};
