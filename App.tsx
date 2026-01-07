import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FarmerForm } from './components/FarmerForm';
import { SchemeResults } from './components/SchemeResults';
import { translations } from './constants/translations';
import { recommendSchemes } from './services/recommendationService';
import type { Language, FarmerData, RecommendedScheme } from './types';
import { Chatbot } from './components/Chatbot';
import { ChatBubbleOvalLeftEllipsisIcon, WheatIcon } from './components/icons/Icons';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [recommendedSchemes, setRecommendedSchemes] = useState<RecommendedScheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const t = translations[language];

  const handleFormSubmit = useCallback((data: FarmerData) => {
    setIsLoading(true);
    setFarmerData(data);
    setShowResults(false); 

    // Simulate a short delay for a better UX
    setTimeout(() => {
      const schemes = recommendSchemes(data);
      setRecommendedSchemes(schemes);
      setIsLoading(false);
      setShowResults(true);
      // Scroll to results after they are rendered
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/40 via-white/60 to-gray-50 z-0"></div>

          <Header language={language} setLanguage={setLanguage} t={t} />
          
          <main className="relative z-10 px-4 pb-16">
            <div className="relative container mx-auto pt-24 md:pt-32 text-center">
              <div className="absolute -top-10 -left-20 md:left-0 opacity-20 -rotate-12 transform-gpu">
                  <WheatIcon className="w-64 h-64 text-yellow-500" />
              </div>
              <div className="absolute -top-10 -right-20 md:right-0 opacity-20 rotate-12 transform-gpu">
                  <WheatIcon className="w-64 h-64 text-yellow-500" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-green-800" style={{ color: '#3b7a57' }}>
                {t.main_title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t.main_subtitle}
              </p>
            </div>

            <div className="container mx-auto mt-12">
              <FarmerForm onSubmit={handleFormSubmit} t={t} isLoading={isLoading} />
            </div>

            {showResults && (
              <div id="results-section" className="container mx-auto mt-16">
                <SchemeResults 
                  schemes={recommendedSchemes} 
                  farmerData={farmerData} 
                  t={t}
                  language={language}
                />
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer t={t} />

      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)}
        language={language}
        t={t}
      />

      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform hover:scale-110"
        aria-label={t.chatbot_title}
        style={{ backgroundColor: '#3b7a57' }}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default App;