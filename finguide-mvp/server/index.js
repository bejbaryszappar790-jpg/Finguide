import { createServer } from "node:http";
import { createApp } from "./lib/app.js";

const port = Number(process.env.PORT || 4173);
const app = createApp();

createServer(app).listen(port, () => {
  console.log(`Finguide AI server running on http://localhost:${port}`);
});
