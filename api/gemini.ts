import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, payload } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    if (!action) {
      return res.status(200).json({ message: "API working" });
    }

    if (action === "chat") {
      const { history = [], newMessage } = payload;

      const contents = [
        ...history.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        {
          role: "user",
          parts: [{ text: newMessage }]
        }
      ];

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents })
        }
      );

      const data = await response.json();

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand.";

      return res.status(200).json({ reply });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err: any) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message });
  }
}
