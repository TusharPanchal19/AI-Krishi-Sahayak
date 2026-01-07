import React, { useState, useCallback, useRef } from 'react';
import type { RecommendedScheme, FarmerData, Language, Reason, ReasonKey } from '../types';
import { translations } from '../constants/translations';
import { getSchemeAnalysis, getSchemeSpeech } from '../services/geminiService';
import { SparklesIcon, DocumentTextIcon, ChevronDownIcon, SpeakerWaveIcon, BookmarkSquareIcon } from './icons/Icons';
import { decode, decodeAudioData } from '../utils/audio';


interface SchemeCardProps {
  scheme: RecommendedScheme;
  farmerData: FarmerData | null;
  t: typeof translations.en;
  index: number;
  language: Language;
}

const getScoreColor = (s: number) => {
  if (s > 75) return 'bg-green-500';
  if (s > 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ProgressBar: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${getScoreColor(score)} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );
};

// Helper function to format reasons
const formatReason = (reason: Reason, t: typeof translations.en): string => {
  let text = t[reason.key as ReasonKey] || reason.key;
  if (reason.values) {
    Object.entries(reason.values).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value));
    });
  }
  return text;
};

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, farmerData, t, index, language }) => {
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ why: string; documents: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  const handleGetAnalysis = useCallback(async () => {
    if (!farmerData) return;
    setIsAnalysisLoading(true);
    setError(null);
    try {
      const result = await getSchemeAnalysis(farmerData, scheme, language);
      setAnalysisResult(result);
      setIsExpanded(true); // Automatically expand when analysis is fetched
    } catch (err) {
      setError(t.error_ai_analysis);
      console.error(err);
    } finally {
      setIsAnalysisLoading(false);
    }
  }, [farmerData, scheme, t.error_ai_analysis, language]);

  const handlePlayAudio = useCallback(async () => {
    setIsTtsLoading(true);
    try {
      const textToSpeak = `${scheme.name}. ${scheme.description}`;
      const base64Audio = await getSchemeSpeech(textToSpeak, language);
      
      if (!audioContextRef.current) {
         audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioContext,
        24000,
        1,
      );
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();

    } catch (err) {
      setError(t.error_tts);
      console.error(err);
    } finally {
      setIsTtsLoading(false);
    }
  }, [scheme, language, t.error_tts]);

  return (
    <div
      className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${getScoreColor(scheme.score)} rounded-l-lg`}></div>
      <div className="pl-8 pr-6 py-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start">
          <div className="flex-1">
            <div className="flex items-start">
              <div className="flex-1 flex items-center">
                 <BookmarkSquareIcon className="w-7 h-7 text-green-600 mr-3 flex-shrink-0" style={{ color: '#3b7a57' }} />
                 <h3 className="text-2xl font-bold" style={{color: '#3b7a57'}}>{scheme.name}</h3>
              </div>
              <button onClick={handlePlayAudio} disabled={isTtsLoading} className="ml-4 p-2 text-gray-500 hover:text-green-700 disabled:text-gray-300 transition-colors" title={t.button_listen_description}>
                {isTtsLoading ? (
                   <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <SpeakerWaveIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            <p className="mt-2 text-gray-600">{scheme.description}</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-left md:text-right">
            <p className="text-sm font-medium text-gray-500">{t.eligibility_score}</p>
            <p className="text-4xl font-bold text-gray-800">{scheme.score}%</p>
            <ProgressBar score={scheme.score} />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                 <h4 className="font-semibold text-gray-700">{t.details}</h4>
                 <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>

            {isExpanded && (
                 <div className="mt-4 space-y-4">
                    <div>
                        <h5 className="font-semibold text-gray-600">{t.why_recommended}</h5>
                        <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                            {scheme.reasons.map((reason, i) => (
                              <li key={i}>{formatReason(reason, t)}</li>
                            ))}
                        </ul>
                    </div>

                    {!analysisResult && (
                         <div className="text-center mt-4">
                            <button
                                onClick={handleGetAnalysis}
                                disabled={isAnalysisLoading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                                style={{ backgroundColor: '#3b7a57' }}
                            >
                                {isAnalysisLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        {t.button_fetching_ai}
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="w-5 h-5 mr-2" />
                                        {t.button_get_ai_analysis}
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {analysisResult && (
                        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                             <h5 className="font-semibold text-green-800 flex items-center"><SparklesIcon className="w-5 h-5 mr-2" /> {t.ai_analysis_title}</h5>
                             <p className="mt-1 text-sm text-green-700">{analysisResult.why}</p>

                             <h5 className="font-semibold text-green-800 flex items-center mt-4"><DocumentTextIcon className="w-5 h-5 mr-2" /> {t.documents_required}</h5>
                             <ul className="list-disc list-inside text-sm text-green-700 mt-1 space-y-1">
                                {analysisResult.documents.map((doc, i) => <li key={i}>{doc}</li>)}
                             </ul>
                        </div>
                    )}
                    
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                    
                    <div className="mt-6 text-right">
                        <a href={scheme.apply_link} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 text-white font-bold py-2 px-6 rounded-md hover:bg-yellow-600 transition-colors" style={{ backgroundColor: '#f4c542' }}>
                            {t.button_apply_now}
                        </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};