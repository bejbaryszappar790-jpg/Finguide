import assert from "node:assert/strict";
import test from "node:test";
import { calculateTax } from "../server/services/business.js";
import { createChatCompletion } from "../server/services/openai.js";
import { createPersonalPlan } from "../server/services/planner.js";

test("business tax calculator returns consistent VAT, profit tax, net profit and margin", () => {
  const result = calculateTax({
    revenue: 3_000_000,
    expenses: 1_200_000,
    vatRate: 0.12,
    profitTaxRate: 0.2,
  });

  assert.equal(result.vat, 360_000);
  assert.equal(result.profitTax, 288_000);
  assert.equal(result.netProfit, 1_152_000);
  assert.equal(result.margin, 0.384);
  assert.deepEqual(result.warnings, []);
});

test("business calculator rejects invalid rates", () => {
  assert.throws(
    () => calculateTax({ revenue: 10, expenses: 1, vatRate: 1.5, profitTaxRate: 0.2 }),
    /Rates must be numbers from 0 to 1/,
  );
});

test("personal planner creates risk-aware plan", () => {
  const result = createPersonalPlan({
    income: 600_000,
    expenses: 350_000,
    debt: 250_000,
    goal: 1_000_000,
  });

  assert.equal(result.freeCashFlow, 250_000);
  assert.equal(result.reserveTarget, 1_050_000);
  assert.equal(result.debtPayment, 87_500);
  assert.equal(result.monthlySaving, 125_000);
  assert.equal(result.monthsToGoal, 8);
  assert.equal(result.riskLevel, "controlled");
});

test("Groq integration sends business persona and language instructions", async () => {
  let requestBody;
  let requestUrl;
  let requestHeaders;
  const fakeFetch = async (url, options) => {
    requestUrl = url;
    requestBody = JSON.parse(options.body);
    requestHeaders = options.headers;
    return {
      ok: true,
      json: async () => ({
        choices: [{
          message: { content: "This is a precise business answer." }
        }],
        usage: { prompt_tokens: 10, completion_tokens: 8 },
      }),
    };
  };

  const result = await createChatCompletion(
    {
      agent: "business",
      language: "en",
      message: "How is VAT calculated?",
      history: [{ role: "user", text: "Hello" }],
      context: { revenue: 1000 },
    },
    { apiKey: "test-key", fetch: fakeFetch },
  );

  assert.equal(result.answer, "This is a precise business answer.");
  assert.equal(requestUrl, "https://api.groq.com/openai/v1/chat/completions");
  assert.match(requestHeaders.Authorization, /^Bearer /);
  assert.match(requestBody.messages[0].content, /business/);
  assert.equal(requestBody.messages.at(-1).content, "How is VAT calculated?");
});;

test("AI integration returns mock when no API key provided", async () => {
  // When GROQ_API_KEY is not set, createChatCompletion returns a mock response (not an error).
  const result = await createChatCompletion(
    { agent: "mentor", language: "ru", message: "Помоги с долгами", history: [], context: {} },
    {},
  );
  assert.match(result.answer, /MOCK/);
});
