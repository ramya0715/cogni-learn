# CogniLearn AI - Cognitive Load Aware Learning

Dynamic placement preparation platform powered by Gemini AI.

## Features
- **AI Quiz Engine**: No static questions. Generates fresh MCQs via Gemini API.
- **Adaptive Difficulty**: Beginner, Moderate, Expert levels.
- **Cognitive Load Aware**: Tracks performance to suggest content.
- **Responsive & Modern**: Dark/Light mode with Tailwind CSS.
- **Database-Less**: Uses LocalStorage for speed and serverless deployment.

## Setup
1. Clone this repo.
2. Run `npm install`.
3. Create a `.env` file and add:
   `VITE_GEMINI_API_KEY=your_key_here`
4. Run `npm run dev`.

## Deployment
Deploy to Vercel/Netlify and add the environment variable `VITE_GEMINI_API_KEY` in the dashboard settings.