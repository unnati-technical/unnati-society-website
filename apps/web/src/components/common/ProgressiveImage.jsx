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
  // ImageKit allows transforming to very small low quality image by adding /tr:w-100,bl-10/
  const isImageKit = src && src.includes('ik.imagekit.io');
  
  const getLowQualitySrc = (originalSrc) => {
    if (!isImageKit) return originalSrc; // fallback to original
    
    // If the URL already has a query string transformation (e.g. ?tr=w-2560), replace it
    if (originalSrc.includes('?tr=')) {
      return originalSrc.replace(/\?tr=[^&]+/, '?tr=w-100,bl-10,q-10');
    }
    
    // Otherwise, append the query parameter for ImageKit transformations
    const separator = originalSrc.includes('?') ? '&' : '?';
    return `${originalSrc}${separator}tr=w-100,bl-10,q-10`;
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
