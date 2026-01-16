import React, { useState, useEffect, useRef } from 'react';
import type { Language, ChatMessage } from '../types';
import { translations } from '../constants/translations';
import { getChatbotResponse } from '../services/geminiService';
import { PaperAirplaneIcon, XMarkIcon } from './icons/Icons';
// Ensure these are imported or defined (as per previous fix)
const SpeakerWaveIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
  </svg>
);

const StopIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
  </svg>
);

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
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'model', content: t.chatbot_greeting }]);
    }
    return () => window.speechSynthesis.cancel();
  }, [isOpen, t.chatbot_greeting]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // --- NEW: CLEANER FUNCTION ---
  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/\*/g, '')      // Remove asterisks
      .replace(/#/g, '')       // Remove hashtags
      .replace(/`/g, '')       // Remove backticks
      .replace(/-/g, '')       // Remove dashes (bullets)
      .replace(/\n/g, '. ')    // Add pause for new lines
      .replace(/\s+/g, ' ');   // Remove extra spaces
  };

  const handleSpeak = (text: string, index: number) => {
    if (speakingId === index) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // USE THE CLEANER HERE
    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (language === 'hi') {
      utterance.lang = 'hi-IN'; 
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setSpeakingId(null);
    setSpeakingId(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const history = newMessages.slice(1); 
      const response = await getChatbotResponse(history, userInput, language);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I couldn't get a response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 transform transition-all duration-300 origin-bottom-right scale-100">
      <div className="flex justify-between items-center p-4 bg-green-700 text-white rounded-t-xl" style={{ backgroundColor: '#3b7a57' }}>
        <h3 className="font-bold text-lg">{t.chatbot_title}</h3>
        <button onClick={() => { window.speechSynthesis.cancel(); onClose(); }} className="p-1 hover:bg-green-600 rounded-full">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col max-w-xs md:max-w-sm px-4 py-2 rounded-2xl break-words ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                
                {msg.role === 'model' && (
                  <div className="mt-2 flex justify-end">
                    <button 
                      onClick={() => handleSpeak(msg.content, index)}
                      className="p-1 rounded-full hover:bg-gray-300 text-gray-600 transition-colors"
                      title="Read Aloud"
                    >
                      {speakingId === index ? (
                         <StopIcon className="w-4 h-4 text-red-500" />
                      ) : (
                         <SpeakerWaveIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                 <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

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
