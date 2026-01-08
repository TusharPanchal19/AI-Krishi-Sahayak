import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, payload } = req.body;

    // BASIC HEALTH CHECK
    if (!action) {
      return res.status(200).json({ message: "API working" });
    }

    // CHATBOT
    if (action === "chat") {
      const { history, newMessage, language } = payload;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

      const chat = model.startChat({
        history: history.map((m: any) => ({
          role: m.role,
          parts: [{ text: m.content }]
        }))
      });

      const result = await chat.sendMessage(newMessage);
      const reply = result.response.text();

      return res.status(200).json({ reply });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status
