import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function RichCard({ data, onAction }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-end gap-2 max-w-full"
    >
      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
        <Bot size={14} />
      </div>

      <div className="w-[85%] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {data.image && (
          <img src={data.image} alt={data.title} className="w-full h-32 object-cover" />
        )}
        <div className="p-3">
          {data.title && <h4 className="font-semibold text-gray-900 text-sm mb-1">{data.title}</h4>}
          {data.description && <p className="text-gray-600 text-xs mb-3">{data.description}</p>}
          
          {data.buttons && data.buttons.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => onAction(btn.action || btn.intent)}
                  className="w-full py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
