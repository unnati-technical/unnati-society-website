import React, { useState, useEffect, useRef } from 'react';
import { Send, Globe, Minimize2, Bot, Sparkles, BookOpen } from 'lucide-react';
import { findIntent } from '../engine/fuzzyMatcher';
import { routeIntent } from '../engine/router';
import { ContextManager } from '../engine/contextManager';
import { t } from '../engine/i18n';
import MessageBubble from './MessageBubble';
import RichCard from './RichCard';
import LanguageSelector from './LanguageSelector';
import WelcomeScreen from './WelcomeScreen';
import type { SourceCitation } from '../types';

const SMART_SUGGESTIONS = [
  'What is DigiXplore?',
  'How do I volunteer?',
  'Upcoming events',
  'About Unnati',
];

interface Message {
  id: string;
  sender: 'user' | 'bot';
  type: 'text' | 'rich_card' | 'navigation';
  data?: {
    text?: string;
    title?: string;
    description?: string;
    buttons?: { label: string; action?: string; intent?: string }[];
  };
  sources?: SourceCitation[];
  intent?: string;
}

export default function ChatWindow({ onClose, onNavigate }) {
  const [viewState, setViewState] = useState<'language' | 'welcome' | 'chat'>('language');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true); // tracks if AI API is responding
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const context = ContextManager.getInstance();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, viewState]);

  const handleLanguageSelect = (langCode: string) => {
    context.setLanguage(langCode);
    setViewState('welcome');
  };

  const startChatWithAction = async (actionOrIntent: string) => {
    if (actionOrIntent === 'change_lang') {
      setViewState('language');
      return;
    }
    setViewState('chat');
    if (actionOrIntent !== 'start_chat') {
      handleAction(actionOrIntent);
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          data: { text: t('greeting') },
        },
      ]);
    }
  };

  const handleAction = async (intentOrAction: string) => {
    if (intentOrAction === 'action_whatsapp') {
      const waNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '';
      if (waNumber) window.open(`https://wa.me/${waNumber}`, '_blank');
      return;
    }

    if (intentOrAction.startsWith('nav_')) {
      if (onNavigate) {
        onNavigate(intentOrAction);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            type: 'text',
            data: { text: t('navigating') },
          },
        ]);
      }
      return;
    }

    // SQL tool quick actions
    if (intentOrAction === 'sql_events') {
      await handleSubmit(null, 'What are the upcoming events?');
      return;
    }

    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 600));
    const response = await routeIntent(intentOrAction, '');
    appendBotResponse(response);
    setIsTyping(false);
  };

  const appendBotResponse = (response: any) => {
    // Handle BotMessage format (from AI API)
    if (response && response.role === 'assistant') {
      setIsAiMode(true);
      setMessages((prev) => [
        ...prev,
        {
          id: response.id || Date.now().toString(),
          sender: 'bot',
          type: response.type || 'text',
          data: {
            text: response.content,
            title: response.title,
            description: response.description,
            buttons: response.buttons,
          },
          sources: response.sources,
          intent: response.intent,
        },
      ]);
    } else {
      // Legacy local response format
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', ...response },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent | null, forcedText: string | null = null) => {
    if (e) e.preventDefault();
    const userText = (forcedText || inputValue).trim();
    if (!userText) return;

    setInputValue('');
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', type: 'text', data: { text: userText } },
    ]);

    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 400));

    const intent = context.getActiveForm() ? 'form_input' : findIntent(userText);
    const response = await routeIntent(intent, userText);

    if (response && (response as any).type === 'navigation' && onNavigate) {
      onNavigate((response as any).action);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          data: { text: 'Taking you to that page...' },
        },
      ]);
    } else {
      appendBotResponse(response);
    }

    setIsTyping(false);
  };

  return (
    <div className="w-[370px] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">Unnati AI Assistant</h3>
            <div className="flex items-center text-xs text-blue-100 gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              {isAiMode ? 'AI Powered · RAG' : 'Online'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewState('language')}
            className="text-white/80 hover:text-white transition"
            title="Change Language"
          >
            <Globe size={18} />
          </button>
          <button onClick={onClose} className="text-white/80 hover:text-white transition">
            <Minimize2 size={18} />
          </button>
        </div>
      </div>

      {viewState === 'language' && <LanguageSelector onSelect={handleLanguageSelect} />}
      {viewState === 'welcome' && <WelcomeScreen onAction={startChatWithAction} />}

      {viewState === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 flex flex-col">
            <div className="space-y-4 flex-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                    {msg.type === 'text' && (
                      <MessageBubble
                        sender={msg.sender}
                        text={msg.data?.text}
                        buttons={msg.data?.buttons}
                        onAction={handleAction}
                      />
                    )}
                    {msg.type === 'rich_card' && (
                      <RichCard data={msg.data} onAction={handleAction} />
                    )}
                  </div>

                  {/* Source citations from RAG */}
                  {msg.sender === 'bot' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-1 ml-2 flex items-center gap-1 flex-wrap">
                      <BookOpen size={10} className="text-gray-400 flex-shrink-0" />
                      {msg.sources.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5"
                          title={s.source}
                        >
                          {s.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex space-x-1 h-[38px] items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Suggestions */}
          {!isTyping &&
            messages.length > 0 &&
            messages[messages.length - 1].sender === 'bot' &&
            !context.getActiveForm() && (
              <div className="px-3 pb-2 pt-1 flex overflow-x-auto scrollbar-hide space-x-2 bg-white">
                {SMART_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(null, suggestion)}
                    className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <form onSubmit={(e) => handleSubmit(e)} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('ask_placeholder')}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 rounded-full text-blue-600 hover:bg-blue-50 disabled:opacity-40 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-center text-[10px] text-gray-300 mt-1">Powered by Gemini AI · RAG</p>
          </div>
        </>
      )}
    </div>
  );
}
