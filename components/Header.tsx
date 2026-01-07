import React from 'react';
import type { Language } from '../types';
import { translations } from '../constants/translations';
import { LeafIcon } from './icons/Icons';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LeafIcon className="w-8 h-8 text-green-700" style={{ color: '#3b7a57' }} />
          <span className="text-xl font-bold text-green-800" style={{ color: '#3b7a57' }}>AI Krishi Sahayak</span>
        </div>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};