import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContextManager } from '../engine/contextManager';
import { t } from '../engine/i18n';

export default function WelcomeScreen({ onAction }) {
  // Use state to force re-render when language changes
  const [lang, setLang] = useState(ContextManager.getInstance().getLanguage());
  
  useEffect(() => {
    setLang(ContextManager.getInstance().getLanguage());
  }, []);

  const actions = [
    { label: t('btn_about'), action: "about_unnati" },
    { label: t('btn_programs'), action: "nav_programs" },
    { label: t('btn_volunteer'), action: "volunteer_main" },
    { label: t('btn_outreach'), action: "outreach_main" },
    { label: t('btn_donate'), action: "nav_donate" },
    { label: t('btn_resources'), action: "nav_resources" },
    { label: t('btn_contact'), action: "nav_contact" },
    { label: t('btn_ask'), action: "start_chat" },
    { label: t('btn_lang'), action: "change_lang" }
  ];

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
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex-1 flex flex-col p-5 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6 mt-4"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">{t('welcome_title')}</h2>
        <p className="text-sm text-blue-600 font-medium mb-1">{t('welcome_subtitle')}</p>
        <p className="text-xs text-gray-500">{t('welcome_ask')}</p>
      </motion.div>

      <div className="w-full h-[1px] bg-gray-100 mb-6"></div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-2 overflow-y-auto scrollbar-hide pb-4"
      >
        {actions.map((btn, idx) => (
          <motion.button
            variants={item}
            key={idx}
            onClick={() => onAction(btn.action)}
            className={`w-full py-3 px-2 text-xs font-semibold rounded-xl transition-all border ${
              btn.action === 'start_chat' 
                ? 'col-span-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                : 'bg-gray-50 border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-700'
            }`}
          >
            {btn.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
