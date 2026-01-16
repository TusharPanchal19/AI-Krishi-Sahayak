import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { action, payload } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

    let contents = [];
    let systemInstructionText = "";
    let generationConfig = {};

    // ==========================================
    // CASE 1: CHATBOT (Standard Text)
    // ==========================================
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

      generationConfig = {
        temperature: 0.7,
        maxOutputTokens: 2000
      };
    } 
    
    // ==========================================
    // CASE 2: SCHEME ANALYSIS (Strict JSON)
    // ==========================================
    else if (action === "analysis") {
      const { farmerData, scheme, language } = payload;
      
      // We force the system to act as a JSON generator
      systemInstructionText = "You are an API that outputs strictly valid JSON.";

      const analysisPrompt = `
        Analyze the scheme "${scheme?.name || 'this scheme'}" for a farmer:
        - State: ${farmerData?.state}
        - Income: ₹${farmerData?.income}
        
        Return a valid JSON object with EXACTLY these two fields:
        1. "explanation": A string with 3 bullet points explaining why it's recommended.
        2. "documents": An array of strings listing required documents (e.g., ["Aadhar Card", "Land Record"]).

        ${language === 'hi' ? 'Output values in Hindi.' : 'Output values in English.'}
      `;

      contents = [{ role: "user", parts: [{ text: analysisPrompt }] }];

      generationConfig = {
        temperature: 0.3,
        maxOutputTokens: 1000,
        responseMimeType: "application/json" // This forces the "documents" array to be created correctly
      };
    } 
    else {
      return res.status(400).json({ error: `Unsupported action: ${action}` });
    }

    // --- CALL GEMINI API (Switched back to 1.5-flash for stability) ---
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstructionText }] },
          contents,
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ],
          generationConfig
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
        // If 1.5 Flash fails, check logs. 
        console.error("Gemini API Error:", JSON.stringify(data, null, 2));
        return res.status(response.status).json({ error: data.error?.message || "API Request Failed" });
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) return res.status(500).json({ error: "Empty response" });

    // --- HANDLE RESPONSE ---
    if (action === "analysis") {
        try {
            // Parse the JSON to get the documents array
            const parsed = JSON.parse(rawText);
            return res.status(200).json({ 
                why: parsed.explanation || "Analysis available.", 
                documents: parsed.documents || [] 
            });
        } catch (e) {
            console.error("JSON Parsing Failed:", rawText);
            return res.status(200).json({ why: rawText, documents: [] });
        }
    } else {
        return res.status(200).json({ reply: rawText });
    }

  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
