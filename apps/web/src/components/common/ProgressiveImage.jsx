import React, { useState, useEffect } from 'react';

export const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  // Very simple blur placeholder based on CDN if possible, else just use CSS blur
  // Cloudinary allows transforming to very small low quality image by adding /w_100,e_blur:1000,q_1/
  // But since we don't know the exact CDN structure for every image, we'll use a generic approach.
  const isCloudinary = src && src.includes('res.cloudinary.com') && src.includes('/upload/');
  
  const getLowQualitySrc = (originalSrc) => {
    if (!isCloudinary) return originalSrc; // fallback to original
    // Insert transformation after /upload/
    const parts = originalSrc.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/w_100,e_blur:1000,q_1/${parts[1]}`;
    }
    return originalSrc;
  };

  useEffect(() => {
    // Start by setting the low quality source
    const lqipSrc = getLowQualitySrc(src);
    setCurrentSrc(lqipSrc);
    
    // Then load the high quality source
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={currentSrc || src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      className={`transition-all duration-700 ease-in-out ${
        isLoaded ? 'blur-0 scale-100' : 'blur-md scale-105'
      } ${className}`}
      {...props}
    />
  );
};
