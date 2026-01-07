import React from 'react';
import { translations } from '../constants/translations';

interface FooterProps {
  t: typeof translations.en;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto py-4 px-4 text-center text-gray-500">
        <p>{t.footer_text}</p>
      </div>
    </footer>
  );
};