import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      console.error("API Key missing");
      return res.status(500).json({ error: "Server Configuration Error: Missing API Key" });
    }

    if (action !== "chat") {
      return res.status(400).json({ error: "Unsupported action" });
    }

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

    // UPDATED: Using 'gemini-2.5-flash' instead of the retired 1.5 version
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
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

    if (!response.ok) {
        console.error("Gemini API Error:", JSON.stringify(data, null, 2));
        // Use a clearer error message for the frontend
        return res.status(response.status).json({ error: data.error?.message || "API Request Failed" });
    }

    const candidate = data?.candidates?.[0];
    
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
