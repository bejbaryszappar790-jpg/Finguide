import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { apiRouter } from "../routes/api.js";

const rootDir = normalize(join(dirname(fileURLToPath(import.meta.url)), "../.."));
const publicDir = rootDir;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

export function createApp(deps = {}) {
  return async function app(req, res) {
    try {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname.startsWith("/api/")) {
        await apiRouter(req, res, deps);
        return;
      }
      await serveStatic(url.pathname, res);
    } catch (error) {
      sendJson(res, 500, {
        error: "internal_error",
        message: "Server error",
        details: process.env.NODE_ENV === "test" ? error.message : undefined,
      });
    }
  };
}

export async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Invalid JSON body");
    error.status = 400;
    error.code = "invalid_json";
    throw error;
  }
}

export function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

export function methodNotAllowed(res) {
  sendJson(res, 405, { error: "method_not_allowed", message: "Method is not allowed" });
}

export function notFound(res) {
  sendJson(res, 404, { error: "not_found", message: "Route not found" });
}

async function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = normalize(safePath).replace(/^(\.\.[/\\])+/, "");
  if (normalizedPath.startsWith("/server/") || normalizedPath.startsWith("/tests/")) {
    notFound(res);
    return;
  }
  const filePath = join(publicDir, normalizedPath);
  const body = await readFile(filePath);
  res.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
  res.end(body);
}
