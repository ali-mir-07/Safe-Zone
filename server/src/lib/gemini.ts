import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment variables. AI will use fallbacks.');
    return null;
  }
  // Using gemini-2.0-flash — fast, capable, and production-ready
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};


/**
 * Fallback values for when the Gemini API is unavailable (e.g., 429 Too Many Requests)
 */
const FALLBACKS = {
  deescalation: (name: string) => `I hear you, ${name}. I'm here in this space with you. Even when words are hard to find, please know you aren't alone. Let's take a slow, deep breath together—inhaling peace, and exhaling all that weight you're carrying. I'm listening.`,
  sentiment: {
    sentiment: 'neutral',
    primary_emotion: 'seeking support',
    safety_warning: false
  },
  grounding: "Let's focus on right now. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Breath slowly as you do this."
};

export const generateGroundingExercise = async () => {
  try {
    const model = getGeminiModel();
    if (!model) return FALLBACKS.grounding;
    const prompt = "Provide a quick 5-4-3-2-1 grounding exercise for someone experiencing anxiety. Keep it calm and concise.";
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini Grounding Error (Fallback used):', error);
    return FALLBACKS.grounding;
  }
};

export const detectSentiment = async (text: string) => {
  try {
    const model = getGeminiModel();
    if (!model) return JSON.stringify(FALLBACKS.sentiment);
    const prompt = `Analyze the sentiment and emotional state of this text: "${text}". 
        Provide a JSON response with:
        - sentiment: (positive, negative, neutral)
        - primary_emotion: (joy, sadness, anger, fear, etc.)
        - safety_warning: (true if there are signs of self-harm or severe distress)`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini Sentiment Error (Fallback used):', error);
    return JSON.stringify(FALLBACKS.sentiment);
  }
};

export const getDeescalationResponse = async (userMessage: string, user?: any) => {
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'friend';
  try {
    const model = getGeminiModel();
    if (!model) return FALLBACKS.deescalation(userName);
    const prompt = `
        You are 'Zen', the highly empathetic, therapeutic AI Sanctuary guide for SafeZone. 
        A user named ${userName} (who is currently seeking support) says: "${userMessage}". 
        
        Your goal is to provide a comprehensive, deeply soothing, and personalized response that makes them feel heard and safe within 5 seconds of reading.
        
        Guidelines:
        1. Validation: Acknowledge their feeling directly with warmth (e.g., "I hear how heavy things feel right now...").
        2. Personalization: Use their name/identifier subtly.
        3. Actionable Calm: If they are distressed, provide a SPECIFIC, short breathing exercise (e.g., "Let's try: Inhale for 4, hold for 4, exhale for 8") or a specific sensory grounding prompt.
        4. Tone: Meditative, gentle, non-judgmental, and clinical only in its safety.
        5. Safety: If they mention self-harm or crisis, provide the international crisis text line/number and urge them to reach out to a professional immediately, but stay calm.
        6. Length: 3-5 sentences. Sufficiently deep but easy to digest.
        
        Do not use hashtags or emojis. Focus on the 'Zen' persona.
        `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini De-escalation Error (Fallback used):', error);
    return FALLBACKS.deescalation(userName);
  }
};

