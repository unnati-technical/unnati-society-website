import React, { useState, useEffect, Suspense, lazy } from 'react';

const LazyChatbot = lazy(() => import('@unnati/chatbot').then(module => ({ default: module.UnnatiChatbot })));

export const DelayedChatbot = ({ onNavigate }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    
    const handleInteraction = () => setShow(true);
    
    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
  
  if (!show) return null;
  
  return (
    <Suspense fallback={null}>
      <LazyChatbot onNavigate={onNavigate} />
    </Suspense>
  );
};
