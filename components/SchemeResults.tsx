
import React from 'react';
import type { RecommendedScheme, FarmerData, Language } from '../types';
import { translations } from '../constants/translations';
import { SchemeCard } from './SchemeCard';

interface SchemeResultsProps {
  schemes: RecommendedScheme[];
  farmerData: FarmerData | null;
  t: typeof translations.en;
  language: Language;
}

export const SchemeResults: React.FC<SchemeResultsProps> = ({ schemes, farmerData, t, language }) => {
  if (!schemes.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">{t.results_title}</h2>
        <p className="text-gray-600">{t.no_schemes_found}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">{t.results_title}</h2>
      {schemes.map((scheme, index) => (
        <SchemeCard 
          key={scheme.name} 
          scheme={scheme} 
          farmerData={farmerData} 
          t={t} 
          index={index}
          language={language}
        />
      ))}
    </div>
  );
};
