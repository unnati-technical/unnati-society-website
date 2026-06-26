import React from 'react';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', native: '🇬🇧 English' },
  { code: 'hi', name: 'Hindi', native: '🇮🇳 हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' }
];

export default function LanguageSelector({ onSelect }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-4xl mb-4">🌍</div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">Choose Your Language</h3>
        <p className="text-sm text-gray-500 mb-6">Select a language to continue</p>
      </motion.div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-h-[300px] overflow-y-auto grid grid-cols-2 gap-2 scrollbar-hide p-1"
      >
        {languages.map(lang => (
          <motion.button
            variants={item}
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className="w-full py-2.5 px-3 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium rounded-xl transition-all"
          >
            {lang.native}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
