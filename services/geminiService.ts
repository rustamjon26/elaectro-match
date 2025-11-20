import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuizQuestion, TokenType } from "../types";
import { FALLBACK_QUESTIONS } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn(
    "⚠ VITE_GEMINI_API_KEY topilmadi → Fallback savollar ishlatiladi."
  );
}

export async function generateQuizQuestions(
  difficulty: string,
  topics: TokenType[]
): Promise<QuizQuestion[]> {
  if (!genAI) {
    return FALLBACK_QUESTIONS;
  }

  const educationalTopics = topics
    .filter(
      (t) =>
        t !== TokenType.NOISE &&
        t !== TokenType.LOCK &&
        t !== TokenType.STATIC_FIELD
    )
    .join(", ");

  // PROMPT O'ZGARDI: 5 -> 10
  const prompt = `
    Generate 10 multiple-choice quiz questions about electronics engineering.
    Difficulty: ${difficulty}

    Topics: ${educationalTopics}.
    
    Requirements:
    - Each question MUST be returned in JSON format.
    - Each question must contain: question, options (4 items), correctIndex (0-3), explanation.
    - Make the questions accurate and educational.
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    // JSON parse qilishga urinish
    // Ba'zan AI ```json ... ``` formatida qaytaradi, shuni tozalash kerak
    const cleanedOutput = output.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanedOutput);

    if (Array.isArray(parsed)) {
      return parsed.slice(0, 10); // 10 ta olish
    }

    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed.questions.slice(0, 10); // 10 ta olish
    }

    return FALLBACK_QUESTIONS;
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    return FALLBACK_QUESTIONS;
  }
}
