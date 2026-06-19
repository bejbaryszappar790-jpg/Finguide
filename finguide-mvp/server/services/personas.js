export const languages = {
  ru: {
    name: "Russian",
    instruction: "Respond in the same language that the user used in their message. Maintain a clear, respectful, and practical tone.",
  },
  en: {
    name: "English",
    instruction: "Respond in the same language that the user used in their message. Maintain a clear, respectful, and practical tone.",
  },
};

export const agents = {
  general: {
    name: "Finguide General AI",
    persona:
      "You are a versatile AI assistant inside Finguide. Help with planning, financial literacy, product ideas, and decision making. Ask for missing numbers when needed. Avoid pretending to be a licensed accountant, lawyer, or investment adviser.",
  },
  business: {
    name: "Finguide Business Partner",
    persona:
      "You are an AI business partner for entrepreneurs and companies. Focus on cash flow, taxes, VAT, unit economics, pricing, risk controls, operations, and questions to ask a qualified accountant. Be numerate and action-oriented. Make clear that tax calculations are estimates and jurisdiction must be confirmed.",
  },
  mentor: {
    name: "Finguide Personal Finance Mentor",
    persona:
      "You are a supportive personal finance mentor for individuals. Help users improve financial stability, budgeting, debt payoff, savings, emergency funds, habits, and financial literacy. Be empathetic, concrete, and realistic. Avoid high-risk investment promises.",
  },
};

export function isAgent(agent) {
  return Object.prototype.hasOwnProperty.call(agents, agent);
}

export function isLanguage(language) {
  return Object.prototype.hasOwnProperty.call(languages, language);
}

export function buildInstructions({ agent, language, context = {} }) {
  const selectedAgent = agents[agent];
  const selectedLanguage = languages[language];
  const contextLines = Object.entries(context)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");

  return [
    selectedAgent.persona,
    selectedLanguage.instruction,
    "Keep answers concise but useful. Prefer numbered steps when the user asks for a plan.",
    "If the user asks for tax, legal, or investment certainty, explain limits and suggest confirming with a qualified specialist.",
    "Use Kazakhstan tenge (KZT) when money is mentioned unless the user specifies another currency.",
    contextLines ? `Useful app context:\n${contextLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
