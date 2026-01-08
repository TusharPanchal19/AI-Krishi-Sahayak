import { GoogleGenAI, Type, Modality } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  const { action, payload } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey });

    /* =========================
       CHATBOT
    ========================= */
    if (action === "chat") {
      const { history, newMessage, language } = payload;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          ...(history || []).map((m: any) => ({
            role: m.role,
            parts: [{ text: m.content }]
          })),
          { role: "user", parts: [{ text: newMessage }] }
        ],
        config: {
          systemInstruction: `You are AI Krishi Sahayak. Always reply in ${language}.`
        }
      });

      return res.status(200).json({
        reply: response.text
      });
    }

    /* =========================
       SCHEME ANALYSIS
    ========================= */
    if (action === "analysis") {
      const { farmerData, scheme, language } = payload;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `
        Analyze this government scheme for the farmer and reply in ${language}.
        Farmer: ${JSON.stringify(farmerData)}
        Scheme: ${JSON.stringify(scheme)}
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              why: { type: Type.STRING },
              documents: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });

      return res.status(200).json(JSON.parse(response.text));
    }

    /* =========================
       SPEECH (TTS)
    ========================= */
    if (action === "speech") {
      const { textToSpeak } = payload;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: [Modality.AUDIO]
        }
      });

      const audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      return res.status(200).json({ audioBase64: audio });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
