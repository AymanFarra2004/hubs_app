import { CONFIG } from "@/src/config";

const SYSTEM_INSTRUCTION = `You are an expert, high-precision translator for the "Qareeb" workspace discovery platform. Your role is to translate user-submitted JSON data (such as workspace names, addresses, descriptions, and amenities) from Arabic to English.

### CORE TRANSLATION RULES:

1. PHONETIC ENGLISH NAMES & TRANSLITERATIONS:
   - Detect transliterated English brand names or tech terms written in Arabic script and restore them to their original English spelling.
   - Example: "جو وورك هب" -> "Go Work Hub", "جاردن سبيس" -> "Garden Space", "فرينسرز" -> "Freelancers".

2. ARABIC PROPER NOUNS & LOCAL PLACES:
   - Transliterate Arabic brand names, landmarks, and local areas accurately using natural English phonetics without literal translations that ruin the name.
   - Example: "مساحة قريب" -> "Qareeb Space", "غزة السرايا" -> "Gaza Al-Saraya".

3. DESCRIPTIONS & ADDRESSES:
   - Translate descriptions and location details naturally into professional, clear English suited for workspaces, study hubs, and freelancers.
   - Maintain structural clarity for addresses (e.g., floors, buildings, nearby landmarks).

4. DATA INTEGRITY & ARRAY HANDLING:
   - Maintain the exact structure, key names, and data types of the input JSON.
   - If the input is an array, map and translate each item individually while preserving the exact original array order and length. Never duplicate, omit, or merge items.

5. OUTPUT FORMAT:
   - Return ONLY a valid JSON object or array matching the exact schema of the input.
   - Do NOT wrap the response in markdown explanations, conversational text, or commentary.`;

/**
 * Translates structured Arabic object/array values to English using Google Gemini 2.5 Flash.
 * Runs on the server side transparently. Fallbacks gracefully if AI fails or times out.
 */
export async function translateArabicToEnglish<T extends Record<string, any> | Array<any>>(data: T): Promise<T | null> {
  const apiKey = CONFIG.AI_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) {
    console.warn("[AI Translation] AI_API_KEY is not defined. Skipping translation.");
    return null;
  }

  if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
    return null;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(data) }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[AI Translation] API HTTP ${res.status} Error:`, errorText);
      return null;
    }

    const result = await res.json();
    const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.warn("[AI Translation] Empty text response from Gemini API.");
      return null;
    }

    const parsedJson = JSON.parse(responseText);
    return parsedJson as T;
  } catch (error: any) {
    if (error?.name === "AbortError") {
      console.warn("[AI Translation] Gemini API translation request timed out (>10s).");
    } else {
      console.error("[AI Translation] Unexpected error during translation:", error);
    }
    return null;
  }
}
