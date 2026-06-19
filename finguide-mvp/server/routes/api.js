import { methodNotAllowed, notFound, readJson, sendJson } from "../lib/app.js";
import { loginUser, registerUser } from "../services/auth.js";
import { calculateTax } from "../services/business.js";
import { createChatCompletion } from "../services/openai.js";
import { createPersonalPlan } from "../services/planner.js";
import { agents, isAgent, isLanguage } from "../services/personas.js";

export async function apiRouter(req, res, deps = {}) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, "http://localhost");
  try {
    if (url.pathname === "/api/health") {
      if (req.method !== "GET") return methodNotAllowed(res);
      sendJson(res, 200, {
        ok: true,
        service: "finguide-ai",
        aiConfigured: Boolean(process.env.GROQ_API_KEY),
        languages: ["ru", "en"],
        agents: Object.keys(agents),
      });
      return;
    }

    if (url.pathname === "/api/i18n") {
      if (req.method !== "GET") return methodNotAllowed(res);
      sendJson(res, 200, { languages: ["ru", "en"], defaultLanguage: "ru" });
      return;
    }

    if (url.pathname === "/api/auth/register") {
      if (req.method !== "POST") return methodNotAllowed(res);
      sendJson(res, 201, registerUser(await readJson(req)));
      return;
    }

    if (url.pathname === "/api/auth/login") {
      if (req.method !== "POST") return methodNotAllowed(res);
      sendJson(res, 200, loginUser(await readJson(req)));
      return;
    }

    if (url.pathname === "/api/chat") {
      if (req.method !== "POST") return methodNotAllowed(res);
      const body = await readJson(req);
      validateChatBody(body);
      const response = await createChatCompletion(body, deps);
      sendJson(res, 200, response);
      return;
    }

    if (url.pathname === "/api/business/tax") {
      if (req.method !== "POST") return methodNotAllowed(res);
      sendJson(res, 200, calculateTax(await readJson(req)));
      return;
    }

    if (url.pathname === "/api/mentor/plan") {
      if (req.method !== "POST") return methodNotAllowed(res);
      sendJson(res, 200, createPersonalPlan(await readJson(req)));
      return;
    }

    notFound(res);
  } catch (error) {
    sendJson(res, error.status || 500, {
      error: error.code || "internal_error",
      message: error.message || "Internal API error",
    });
  }
}

function validateChatBody(body) {
  if (!isAgent(body.agent)) {
    const error = new Error("Unknown AI agent");
    error.status = 400;
    error.code = "invalid_agent";
    throw error;
  }
  if (!isLanguage(body.language)) {
    const error = new Error("Language must be ru or en");
    error.status = 400;
    error.code = "invalid_language";
    throw error;
  }
  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 2) {
    const error = new Error("Message is required");
    error.status = 400;
    error.code = "invalid_message";
    throw error;
  }
}
