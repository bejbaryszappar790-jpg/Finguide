import assert from "node:assert/strict";
import { Readable } from "node:stream";
import test from "node:test";
import { apiRouter } from "../server/routes/api.js";

async function request(method, url, body, deps = {}) {
  const req = Readable.from(body ? [JSON.stringify(body)] : []);
  req.method = method;
  req.url = url;

  const res = {
    statusCode: 0,
    headers: {},
    body: "",
    writeHead(status, headers) {
      this.statusCode = status;
      this.headers = headers;
    },
    end(chunk = "") {
      this.body = String(chunk);
    },
  };

  await apiRouter(req, res, deps);
  return {
    status: res.statusCode,
    payload: res.body ? JSON.parse(res.body) : null,
  };
}

test("health endpoint exposes supported agents and languages", async () => {
  const response = await request("GET", "/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.payload.ok, true);
  assert.deepEqual(response.payload.languages, ["ru", "en"]);
  assert.deepEqual(response.payload.agents, ["general", "business", "mentor"]);
});

test("auth register and login routes return sessions", async () => {
  const email = `demo-${Date.now()}@example.com`;
  const registered = await request("POST", "/api/auth/register", {
    name: "Demo",
    email,
    password: "demo1234",
  });

  assert.equal(registered.status, 201);
  assert.equal(registered.payload.user.email, email);
  assert.ok(registered.payload.token);

  const loggedIn = await request("POST", "/api/auth/login", {
    email,
    password: "demo1234",
  });

  assert.equal(loggedIn.status, 200);
  assert.equal(loggedIn.payload.user.name, "Demo");
  assert.ok(loggedIn.payload.token);
});

test("chat route validates agent and language", async () => {
  const response = await request("POST", "/api/chat", {
    agent: "wrong",
    language: "ru",
    message: "hello",
  });

  assert.equal(response.status, 400);
  assert.equal(response.payload.error, "invalid_agent");
});

test("chat route returns mocked AI answer when configured", async () => {
  const response = await request(
    "POST",
    "/api/chat",
    { agent: "mentor", language: "ru", message: "Как закрыть долг?", history: [] },
    {
      apiKey: "test-key",
      fetch: async () => ({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Сначала стабилизируйте бюджет." } }],
          usage: { prompt_tokens: 10, completion_tokens: 8 },
        }),
      }),
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.payload.answer, "Сначала стабилизируйте бюджет.");
});

test("unknown API routes return 404", async () => {
  const response = await request("GET", "/api/missing");

  assert.equal(response.status, 404);
  assert.equal(response.payload.error, "not_found");
});
