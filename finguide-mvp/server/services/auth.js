import { randomUUID } from "node:crypto";

const users = new Map();

export function registerUser(body) {
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  validateAuth({ email, password });
  if (name.length < 2) throwApiError("Name is required", 400, "invalid_name");
  if (users.has(email)) throwApiError("User already exists", 409, "user_exists");

  users.set(email, { id: randomUUID(), name, email, password });
  return createSession(users.get(email));
}

export function loginUser(body) {
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  validateAuth({ email, password });
  const user = users.get(email);
  if (!user || user.password !== password) throwApiError("Invalid email or password", 401, "invalid_credentials");
  return createSession(user);
}

function validateAuth({ email, password }) {
  if (!email.includes("@")) throwApiError("Valid email is required", 400, "invalid_email");
  if (password.length < 4) throwApiError("Password must contain at least 4 characters", 400, "invalid_password");
}

function createSession(user) {
  return {
    token: randomUUID(),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

function throwApiError(message, status, code) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  throw error;
}
