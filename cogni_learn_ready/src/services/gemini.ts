import { GoogleGenerativeAI } from "@google/generative-ai";

// Use import.meta.env for Vite projects
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not defined in your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

/**
 * Generates a quiz based on a topic and difficulty level using Gemini AI.
 * @param topic - The subject (e.g., 'Java', 'React')
 * @param level - Difficulty (e.g., 'Beginner', 'Expert')
 */
export const generateQuiz = async (topic: string, level: string) => {
  try {
    // Using gemini-1.5-flash for faster response times
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate a 5-question multiple choice quiz about ${topic} for a ${level} level student. 
      Return ONLY a valid JSON array of objects with this exact structure: 
      [
        {
          "question": "text", 
          "options": ["option1", "option2", "option3", "option4"], 
          "answer": 0, 
          "explanation": "short explanation text"
        }
      ]
      Note: The "answer" must be the index (0-3) of the correct option. Do not include any markdown formatting or backticks.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response in case the AI includes markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini AI Quiz Generation Error:", error);
    // Return null or throw error so the UI can handle the failure state
    throw new Error("Failed to generate quiz. Please check your API key and network.");
  }
};
