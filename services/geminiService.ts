import type { ChatMessage, Language } from "../types";

/* CHATBOT */
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

  const data = await res.json();
  return data.reply;
}

/* SCHEME ANALYSIS */
export async function getSchemeAnalysis(prompt: string) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "analysis",
      payload: { prompt }
    })
  });

  const data = await res.json();
  return JSON.parse(data.result);
}
