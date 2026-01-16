import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Handle CORS (Optional but good for safety)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, payload } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API Key missing in environment variables");
      return res.status(500).json({ error: "Server Configuration Error: Missing API Key" });
    }

    if (action !== "chat") {
      return res.status(400).json({ error: "Unsupported action" });
    }

    const { history = [], newMessage } = payload;

    // 2. Formatting the conversation for Gemini
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

    // 3. The FETCH Call (UPDATED)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          // CRITICAL FIX: Disable safety filters to prevent empty responses
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512
          }
        })
      }
    );

    const data = await response.json();

    // 4. Debugging: Log the raw response to Vercel Logs
    if (!response.ok) {
        console.error("Gemini API Error:", JSON.stringify(data, null, 2));
        return res.status(response.status).json({ error: data.error?.message || "API Request Failed" });
    }

    // 5. Extract text safely
    const candidate = data?.candidates?.[0];
    
    // Check if it was blocked by safety
    if (candidate?.finishReason === "SAFETY") {
        return res.status(200).json({ reply: "I cannot answer this due to safety guidelines." });
    }

    const reply = candidate?.content?.parts?.map((p: any) => p.text).join("") 
                  || "No response from Gemini (Empty Content)";

    return res.status(200).json({ reply });

  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
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
