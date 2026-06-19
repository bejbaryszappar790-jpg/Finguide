import { buildInstructions } from "./personas.js";

// Groq configuration – free tier key
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
// Default model (stable and recommended for business answers)
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * Create a chat completion using the Groq API.
 *
 * @param {{agent:string, language:string, message:string, history:Array<{role:string,text:string}>, context:any}} params
 * @param {{fetch?:Function}} deps Optional dependency injection (useful for tests)
 * @returns {{answer:string, model:string, agent:string, language:string, usage:any}}
 */
export async function createChatCompletion(
  { agent, language, message, history, context },
  deps = {}
) {
  // Allow injection of a custom fetch and apiKey (e.g., for unit‑tests)
  const fetchImpl = deps.fetch || fetch;
  // Read key inside function so tests can inject via deps.apiKey
  const apiKey = deps.apiKey !== undefined ? deps.apiKey : process.env.GROQ_API_KEY;

  // If no key is set, return a mock response so the UI still works.
  if (!apiKey) {
    return { answer: "[MOCK] AI response (Groq) – set GROQ_API_KEY to get real answers" };
  }

  const systemPrompt = `You are a ${agent} assistant that replies in ${
    language === "en" ? "English" : "Russian"
  }. Keep answers concise and finance‑focused.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.text,
    })),
    { role: "user", content: message },
  ];

  const payload = {
    model: DEFAULT_MODEL,
    messages,
    temperature: 0.7,
  };

  const response = await fetchImpl(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Special handling for 401 Invalid API Key errors
    if (response.status === 401) {
      const error = new Error("Ошибка авторизации Groq API. Проверьте правильность ключа GROQ_API_KEY в переменной окружения");
      error.status = 401;
      error.code = "groq_auth_error";
      throw error;
    }
    const error = new Error(data.error?.message || "AI provider request failed");
    error.status = response.status >= 500 ? 502 : response.status;
    error.code = "ai_provider_error";
    throw error;
  }

  const answer = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!answer) {
    const error = new Error("AI response did not include text");
    error.status = 502;
    error.code = "empty_ai_response";
    throw error;
  }

  return {
    agent,
    language,
    model: DEFAULT_MODEL,
    answer,
    usage: data.usage || null,
  };
}

// Helper kept for compatibility – not used directly by the current flow.
export function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((msg) => ["user", "ai"].includes(msg.role) && typeof msg.text === "string")
    .map((msg) => ({ role: msg.role, text: msg.text.slice(0, 2000) }));
}
