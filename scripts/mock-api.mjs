#!/usr/bin/env node
/**
 * A fake backend for trying the application form locally, without the
 * real backend.
 *
 *   Terminal 1:  npm run mock-api
 *   Terminal 2:  BACKEND_URL=http://localhost:8000 npm run dev
 *
 * It prints every application it receives and answers 201 Created.
 * To see how the form shows errors, choose another status:
 *   MOCK_STATUS=500 npm run mock-api
 */

import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 8000);
const STATUS = Number(process.env.MOCK_STATUS ?? 201);

createServer((request, response) => {
  if (request.method !== "POST" || request.url !== "/applications") {
    response.writeHead(404).end();
    return;
  }

  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    console.log(`\n${new Date().toLocaleTimeString()}  POST /applications → ${STATUS}`);
    try {
      console.log(JSON.parse(body));
    } catch {
      console.log("(body is not valid JSON)", body);
    }
    response.writeHead(STATUS, { "Content-Type": "application/json" });
    response.end(JSON.stringify(STATUS === 201 ? { ok: true } : { error: "mock error" }));
  });
}).listen(PORT, () => {
  console.log(`Mock API on http://localhost:${PORT}/applications (answers ${STATUS})`);
});
