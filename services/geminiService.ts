
import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { FarmerData, RecommendedScheme, Language, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface GeminiResponse {
  why_it_is_recommended: string;
  documents_required: string[];
}

export const getSchemeAnalysis = async (
  farmerData: FarmerData,
  scheme: RecommendedScheme,
  language: Language
): Promise<{ why: string; documents: string[] }> => {
  const langName = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    gu: 'Gujarati',
    pa: 'Punjabi',
  }[language];

  const prompt = `
    Analyze the following Indian government agricultural scheme for a specific farmer.
    Provide the response in ${langName}.

    **Farmer's Profile:**
    - State: ${farmerData.state}
    - District: ${farmerData.district}
    - Primary Crop: ${farmerData.crop}
    - Land Size: ${farmerData.landSize} acres
    - Annual Income: ₹${farmerData.annualIncome.toLocaleString('en-IN')}
    - Irrigation Type: ${farmerData.irrigationType}

    **Scheme Details:**
    - Name: ${scheme.name}
    - Description: ${scheme.description}
    - Eligibility Score Calculated: ${scheme.score}%

    Based on the farmer's profile and the scheme details, provide a concise, personalized analysis.
    The output must be a valid JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            why_it_is_recommended: {
              type: Type.STRING,
              description: `A personalized, one or two sentence explanation in ${langName} on why this scheme is a good fit for this specific farmer, considering all their profile details.`
            },
            documents_required: {
              type: Type.ARRAY,
              description: `A list of common documents (in ${langName}) that the farmer would likely need to apply for this scheme (e.g., Aadhaar Card, Land records/Patta, Bank account passbook, Photograph).`,
              items: {
                type: Type.STRING
              }
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const result: GeminiResponse = JSON.parse(jsonText);
    
    return {
      why: result.why_it_is_recommended,
      documents: result.documents_required,
    };

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};

export const getSchemeSpeech = async (textToSpeak: string, language: Language): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: textToSpeak }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // A versatile, clear voice
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini API.");
    }
    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS API call failed:", error);
    throw new Error("Failed to get speech from Gemini API.");
  }
};


export const getChatbotResponse = async (history: ChatMessage[], newMessage: string, language: Language): Promise<string> => {
  const langName = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    gu: 'Gujarati',
    pa: 'Punjabi',
  }[language];
  
  const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
  }));

  const systemInstruction = `You are "AI Krishi Sahayak," a friendly and knowledgeable AI assistant for Indian farmers. Your goal is to provide helpful, concise, and practical advice on daily farming problems.
  - Always respond in ${langName}.
  - Keep your answers easy to understand for a non-technical audience.
  - Topics you can cover include: crop diseases, pest control, soil health, weather advice, irrigation techniques, and market prices.
  - Do not answer questions outside of farming topics.
  - Be supportive and encouraging.`;

  try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...formattedHistory, { role: 'user', parts: [{ text: newMessage }] }],
        config: {
          systemInstruction: systemInstruction,
        },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chatbot API call failed:", error);
    throw new Error("Failed to get response from Chatbot API.");
  }
};
