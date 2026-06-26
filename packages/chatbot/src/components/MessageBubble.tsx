import React from 'react';
import { motion } from 'framer-motion';
import { CheckCheck, User, Bot } from 'lucide-react';

export default function MessageBubble({ sender, text, buttons, onAction }) {
  const isBot = sender === 'bot';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2 max-w-full ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
        {isBot ? <Bot size={14} /> : <User size={14} />}
      </div>

      <div className="flex flex-col max-w-[85%]">
        <div className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
          isBot 
            ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm' 
            : 'bg-blue-600 text-white rounded-tr-sm'
        }`}>
          <div className="whitespace-pre-wrap">{text}</div>
        </div>
        
        {!isBot && (
          <div className="flex justify-end mt-1 text-blue-500">
            <CheckCheck size={14} />
          </div>
        )}
        
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => onAction(btn.action)}
                className="text-xs font-semibold bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow-sm"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
