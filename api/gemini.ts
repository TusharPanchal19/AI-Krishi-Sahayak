import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, payload } = req.body;

    // Health check
    if (!action) {
      return res.status(200).json({ message: "API working" });
    }

    if (action === "chat") {
      const { history = [], newMessage } = payload;

      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // ✅ STABLE MODEL
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: newMessage }] },
        ],
      });

      return res.status(200).json({
        reply: response.text,
      });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error: any) {
    console.error("Gemini backend error:", error);
    return res.status(500).json({
      error: "Gemini API failed",
      details: error?.message || "Unknown error",
    });
  }
}
