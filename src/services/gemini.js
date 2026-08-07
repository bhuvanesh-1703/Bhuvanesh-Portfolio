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
    const systemInstruction = generateSystemPrompt();

    // Format history for Gemini API
    // Filter out the initial greeting (first model message) since the API
    // requires history to start with a 'user' role, not 'model'
    const validHistory = history.slice(1);

    const formattedHistory = validHistory
      .filter((msg) => msg.content && msg.content.trim() !== "")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

    // Ensure history alternates roles and starts with 'user'
    const sanitizedHistory = [];
    for (const entry of formattedHistory) {
      const lastRole = sanitizedHistory.length > 0
        ? sanitizedHistory[sanitizedHistory.length - 1].role
        : null;
      if (entry.role !== lastRole) {
        sanitizedHistory.push(entry);
      }
    }

    // Try primary model gemini-2.5-flash, with fallback models if quota is exceeded
    const candidateModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-1.5-flash-8b"];
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemInstruction,
        });

        const chat = model.startChat({
          history: sanitizedHistory,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.2,
          },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying next candidate if available...`, err.message);
      }
    }

    throw lastError;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
}
