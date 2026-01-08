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
    throw new Error("Scheme analysis API failed");
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
