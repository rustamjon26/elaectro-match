import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuizQuestion, TokenType } from '../types';
import { FALLBACK_QUESTIONS } from '../constants';

// Define the schema for the quiz response
const quizSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Must contain exactly 4 options"
          },
          correctIndex: { 
            type: Type.INTEGER,
            description: "Zero-based index of the correct answer (0-3)"
          },
          explanation: { type: Type.STRING }
        },
        required: ["question", "options", "correctIndex", "explanation"]
      }
    }
  },
  required: ["questions"]
};

export const generateQuizQuestions = async (
  difficulty: string, 
  topics: TokenType[]
): Promise<QuizQuestion[]> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("No API Key found. Using fallback questions.");
    return FALLBACK_QUESTIONS;
  }

  const ai = new GoogleGenAI({ apiKey });

  // Filter out special types to focus on educational topics
  const educationalTopics = topics.filter(t => 
    t !== TokenType.NOISE && t !== TokenType.LOCK && t !== TokenType.STATIC_FIELD
  ).join(', ');

  const prompt = `
    Generate 5 multiple-choice electronics engineering quiz questions.
    Difficulty Level: ${difficulty}
    Topics: ${educationalTopics} and general circuit theory.
    
    For "BJT", focus on bipolar junction transistors.
    For "FET", focus on field effect transistors.
    For "GAIN", focus on amplifiers and decibels.
    For "HIGH_Z", focus on impedance and tristate logic.
    For "SWITCH", focus on transistor switching regions and logic gates.
    
    Ensure the questions are educational and accurate.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        systemInstruction: "You are a senior electrical engineer creating an exam for students.",
        temperature: 0.7,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        return data.questions.slice(0, 5);
      }
    }
    return FALLBACK_QUESTIONS;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_QUESTIONS;
  }
};