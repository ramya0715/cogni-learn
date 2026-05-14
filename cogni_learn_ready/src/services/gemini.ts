import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateQuiz = async (topic: string, level: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate a 5-question multiple choice quiz about ${topic} for a ${level} level student. 
  Return ONLY a valid JSON array of objects with this structure:
  [{"question": "text", "options": ["a", "b", "c", "d"], "answer": 0, "explanation": "text"}]
  Do not include any markdown formatting or extra text.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Clean potential markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Quiz Error:", error);
    return null;
  }
};