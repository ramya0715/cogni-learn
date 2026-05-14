import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateQuiz = async (topic: string, level: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Generate a 5-question multiple choice quiz about ${topic} for a ${level} level student. 
  Return ONLY a valid JSON array of objects with this structure: 
  [{"question": "text", "options": ["a", "b", "c", "d"], "answer": 0, "explanation": "text"}]`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/
http://googleusercontent.com/immersive_entry_chip/0
3.  **Vercel Setup:**
    * Log in to Vercel and **Import** this new repository[cite: 55].
    * **Environment Variables:** Under settings, add `VITE_GEMINI_API_KEY` and paste your key from Google AI Studio[cite: 56, 57].
    * **Framework:** Vercel should auto-detect **Vite**. Click **Deploy**.

**Why this works:** Vite looks for `index.html` in the root. By moving it there and creating `src/main.tsx`, you fulfill the standard "Vite structure" that Vercel expects for zero-config deployments.
