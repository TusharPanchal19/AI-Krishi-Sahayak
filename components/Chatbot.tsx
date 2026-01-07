import React, { useState, useEffect, useRef } from 'react';
import type { Language, ChatMessage } from '../types';
import { translations } from '../constants/translations';
import { getChatbotResponse } from '../services/geminiService';
import { PaperAirplaneIcon, XMarkIcon } from './icons/Icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  t: typeof translations.en;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, language, t }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'model', content: t.chatbot_greeting }]);
    }
  }, [isOpen, t.chatbot_greeting]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const history = newMessages.slice(1); // Exclude initial greeting
      const response = await getChatbotResponse(history, userInput, language);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I couldn't get a response. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 transform transition-all duration-300 origin-bottom-right scale-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-green-700 text-white rounded-t-xl" style={{ backgroundColor: '#3b7a57' }}>
        <h3 className="font-bold text-lg">{t.chatbot_title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-green-600 rounded-full">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t.chatbot_placeholder}
            className="flex-1 w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2 bg-green-700 text-white rounded-full disabled:bg-gray-400 hover:bg-green-800 transition-colors" style={{ backgroundColor: '#3b7a57' }}>
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
