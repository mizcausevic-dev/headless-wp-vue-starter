import express from "express";

import { architectureLane, contentFlow, payload, starterFiles, summary, verification } from "./services/headlessStarterService";
import {
  renderArchitectureLane,
  renderContentFlow,
  renderDocs,
  renderOverview,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5384);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/architecture-lane", (_req, res) => res.type("html").send(renderArchitectureLane()));
app.get("/content-flow", (_req, res) => res.type("html").send(renderContentFlow()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/architecture-lane", (_req, res) => res.json(architectureLane()));
app.get("/api/content-flow", (_req, res) => res.json(contentFlow()));
app.get("/api/starter-files", (_req, res) => res.json(starterFiles()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Headless WP Vue Starter listening on http://127.0.0.1:${port}`);
  });
}

export default app;
