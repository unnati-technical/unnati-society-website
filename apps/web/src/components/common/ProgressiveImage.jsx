import React, { useState, useEffect } from 'react';

export const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackSrc = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  const isImageKit = src && typeof src === 'string' && src.includes('ik.imagekit.io');
  
  const getLowQualitySrc = (originalSrc) => {
    if (!originalSrc || typeof originalSrc !== 'string') return '';
    if (!isImageKit) return originalSrc;
    
    if (originalSrc.includes('?tr=')) {
      return originalSrc.replace(/\?tr=[^&]+/, '?tr=w-100,bl-10,q-10');
    }
    
    const separator = originalSrc.includes('?') ? '&' : '?';
    return `${originalSrc}${separator}tr=w-100,bl-10,q-10`;
  };

  useEffect(() => {
    if (!src) {
      setCurrentSrc(fallbackSrc || '');
      setIsLoaded(true);
      return;
    }

    const lqipSrc = getLowQualitySrc(src);
    setCurrentSrc(lqipSrc);
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setCurrentSrc(src);
      }
      setIsLoaded(true);
    };
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc || src || fallbackSrc}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={(e) => {
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      className={`transition-all duration-700 ease-in-out ${
        isLoaded ? 'blur-0 scale-100' : 'blur-md scale-105'
      } ${className}`}
      {...props}
    />
  );
};
