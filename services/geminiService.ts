import type { FarmerData, RecommendedScheme, Language, ChatMessage } from "../types";

/* =========================
   CHATBOT
========================= */
export async function getChatbotResponse(
  history: ChatMessage[],
  newMessage: string,
  language: Language
): Promise<string> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "chat",
      payload: { history, newMessage, language }
    })
  });

  if (!res.ok) {
    throw new Error("Chatbot API failed");
  }

  const data = await res.json();
  return data.reply;
}

/* =========================
   SCHEME ANALYSIS
========================= */
export async function getSchemeAnalysis(
  farmerData: FarmerData,
  scheme: RecommendedScheme,
  language: Language
): Promise<{ why: string; documents: string[] }> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "analysis",
      payload: { farmerData, scheme, language }
    })
  });

if (!res.ok) {
  const err = await res.text();
  throw new Error(err);
}


  const data = await res.json();
  return data;
}

/* =========================
   SCHEME SPEECH (TTS)
========================= */
export async function getSchemeSpeech(
  textToSpeak: string,
  language: Language
): Promise<string> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "speech",
      payload: { textToSpeak, language }
    })
  });

  if (!res.ok) {
    throw new Error("Speech API failed");
  }

  const data = await res.json();
  return data.audioBase64; // base64 audio
}
// services/geminiService.ts

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // WRAPPER ADDED HERE: matching the structure expected by api/gemini.ts
      body: JSON.stringify({
        action: 'chat', 
        payload: {
          history,
          newMessage,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API Error: ${response.status}`);
    }

    return data.reply;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // Return a friendly error message to the UI so it doesn't just crash
    return "Sorry, I am having trouble connecting to the server right now. Please try again.";
  }
};
