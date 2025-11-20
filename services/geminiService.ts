import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuizQuestion, TokenType } from "../types";
import { FALLBACK_QUESTIONS } from "../constants";

// ===============================
//  Load API key from Vite env
// ===============================
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// ===============================
//  Setup model instance
// ===============================
let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("⚠ VITE_GEMINI_API_KEY topilmadi → Fallback savollar ishlatiladi.");
}

// =====================================================
// Generate 5 quiz questions using Gemini (or fallback)
// =====================================================
export async function generateQuizQuestions(
  difficulty: string,
  topics: TokenType[]
): Promise<QuizQuestion[]> {

  // Agar API yo‘q bo‘lsa → fallback
  if (!genAI) {
    return FALLBACK_QUESTIONS;
  }

  // "noise" va "lock" kabi tokenlarni chiqarib tashlaymiz
  const educationalTopics = topics
    .filter(
      (t) =>
        t !== TokenType.NOISE &&
        t !== TokenType.LOCK &&
        t !== TokenType.STATIC_FIELD
    )
    .join(", ");

  // AI uchun prompt
  const prompt = `
    Generate 5 multiple-choice quiz questions about electronics engineering.
    Difficulty: ${difficulty}

    Topics: ${educationalTopics}.
    
    Requirements:
    - Each question MUST be returned in JSON format.
    - Each question must contain: question, options (4 items), correctIndex (0-3), explanation.
    - Make the questions accurate and educational.
  `;

  try {
    // Gemini Flash model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    const output = result.response.text();
    console.log("➡ Gemini output:", output);

    // Try parsing JSON
    const parsed = JSON.parse(output);

    if (Array.isArray(parsed)) {
      return parsed.slice(0, 5);
    }

    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed.questions.slice(0, 5);
    }

    return FALLBACK_QUESTIONS;
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    return FALLBACK_QUESTIONS;
  }
}
