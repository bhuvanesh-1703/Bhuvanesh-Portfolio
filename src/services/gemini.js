import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateSystemPrompt } from "../utils/systemPrompt";

// Initialize the Gemini API client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function sendMessageToGemini(message, history = []) {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format history for Gemini API
    const formattedHistory = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

 
    const systemInstruction = generateSystemPrompt();

    const modelWithSystemInstruction = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    const chat = modelWithSystemInstruction.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.2, // Low temperature for more factual, less creative responses
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
}
