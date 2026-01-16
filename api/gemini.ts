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

    // ==========================================
    // CASE 1: CHATBOT
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
    } 
    
    // ==========================================
    // CASE 2: SCHEME ANALYSIS (Fixes your Error)
    // ==========================================
    else if (action === "analysis") {
      const { farmerData, scheme, language } = payload;
      systemInstructionText = "You are an expert government scheme analyst for Indian farmers.";
      
      // Create a specific prompt for analysis
      const analysisPrompt = `
        Analyze the scheme "${scheme?.name || 'this scheme'}" for a farmer with these details:
        - State: ${farmerData?.state}
        - Crop: ${farmerData?.crop}
        - Income: ₹${farmerData?.income}
        
        Explain strictly in 3-4 short bullet points why this scheme is specifically recommended for them.
        ${language === 'hi' ? 'Reply in Hindi.' : 'Reply in English.'}
      `;

      contents = [{ role: "user", parts: [{ text: analysisPrompt }] }];
    }
    
    // CASE 3: UNSUPPORTED
    else {
      return res.status(400).json({ error: `Unsupported action: ${action}` });
    }

    // --- CALL GEMINI API ---
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000 
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Gemini API Error:", JSON.stringify(data, null, 2));
        return res.status(response.status).json({ error: data.error?.message || "API Request Failed" });
    }

    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis not available.";

    // --- RETURN RESPONSE BASED ON ACTION ---
    if (action === "analysis") {
        // The frontend expects a 'why' field for analysis
        return res.status(200).json({ why: textResponse, documents: [] });
    } else {
        // The chatbot expects a 'reply' field
        return res.status(200).json({ reply: textResponse });
    }

  } catch (err: any) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
