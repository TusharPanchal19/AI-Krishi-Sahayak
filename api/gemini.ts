import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

  const { action, payload } = req.body;

  // HELPER: Function to call Gemini with a specific model
  async function callGemini(modelName: string, requestBody: any) {
    console.log(`Attempting with model: ${modelName}`);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  }

  try {
    let contents = [];
    let systemInstructionText = "";
    let generationConfig = {};
    let isJsonMode = false;

    // --- SETUP PROMPTS ---
    if (action === "chat") {
      const { history = [], newMessage } = payload;
      systemInstructionText = "You are AI Krishi Sahayak, an expert agricultural assistant. Provide detailed, helpful advice on farming, crops, and government schemes. Use bullet points.";
      
      contents = [
        ...history.map((m: any) => ({
          role: m.role === "assistant" || m.role === "model" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        { role: "user", parts: [{ text: newMessage }] }
      ];
      generationConfig = { temperature: 0.7, maxOutputTokens: 2000 };
    } 
    else if (action === "analysis") {
      const { farmerData, scheme, language } = payload;
      systemInstructionText = "You are an API that outputs strictly valid JSON.";
      const analysisPrompt = `
        Analyze the scheme "${scheme?.name || 'this scheme'}" for a farmer:
        - State: ${farmerData?.state}
        - Income: ₹${farmerData?.income}
        Return valid JSON with two fields: "explanation" (string with 3 bullets) and "documents" (array of strings).
        ${language === 'hi' ? 'Output in Hindi.' : 'Output in English.'}
      `;
      contents = [{ role: "user", parts: [{ text: analysisPrompt }] }];
      generationConfig = { temperature: 0.3, maxOutputTokens: 1000, responseMimeType: "application/json" };
      isJsonMode = true;
    } 
    else {
      return res.status(400).json({ error: `Unsupported action: ${action}` });
    }

    // --- PREPARE REQUEST BODY ---
    // Note: We move systemInstruction to the "contents" for maximum compatibility if needed, 
    // but v1beta supports systemInstruction field. We will stick to the standard structure.
    const requestBody = {
      systemInstruction: { parts: [{ text: systemInstructionText }] },
      contents,
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ],
      generationConfig
    };

    // --- ATTEMPT 1: gemini-1.5-flash (Standard) ---
    // This gave us a 503 before, which means it EXISTS.
    let result = await callGemini("gemini-1.5-flash", requestBody);

    // --- ATTEMPT 2: Fallback to gemini-pro if Flash fails ---
    // If Flash is 404 or 503, try the older robust model
    if (!result.ok) {
      console.warn(`Primary model failed (${result.status}). Trying fallback...`);
      // gemini-pro doesn't support systemInstruction or JSON mode well, so we adapt slightly
      const fallbackBody = { ...requestBody };
      delete fallbackBody.systemInstruction; // Remove incompatible field
      delete fallbackBody.generationConfig;  // Remove potential JSON config
      
      // Inject system instruction into the first prompt instead
      fallbackBody.contents[0].parts[0].text = systemInstructionText + "\n\n" + fallbackBody.contents[0].parts[0].text;
      
      result = await callGemini("gemini-pro", fallbackBody);
    }

    // --- FINAL ERROR CHECK ---
    if (!result.ok) {
      console.error("All models failed:", JSON.stringify(result.data, null, 2));
      return res.status(result.status).json({ error: result.data.error?.message || "AI Busy. Try again." });
    }

    const rawText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return res.status(500).json({ error: "Empty response" });

    // --- HANDLE RESPONSE ---
    if (action === "analysis") {
      try {
        // If we used the fallback (gemini-pro), it returns text, not JSON. We try to parse, else wrap it.
        // Clean markdown code blocks if present (```json ... ```)
        const cleanText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanText);
        return res.status(200).json({ 
          why: parsed.explanation || "Analysis available.", 
          documents: parsed.documents || [] 
        });
      } catch (e) {
        console.error("JSON Parse Failed (using fallback text):", rawText);
        // If JSON fails, just put the raw text in the 'why' field
        return res.status(200).json({ why: rawText, documents: ["Check scheme details for documents."] });
      }
    } else {
      return res.status(200).json({ reply: rawText });
    }

  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
