import { mkdirSync, writeFileSync } from "fs";
import { cpSync } from "fs";
import { join } from "path";

import {
  renderArchitectureLane,
  renderContentFlow,
  renderDocs,
  renderOverview,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "architecture-lane/index.html", content: renderArchitectureLane() },
  { path: "content-flow/index.html", content: renderContentFlow() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

const starterSource = join(process.cwd(), "starter");
const starterTarget = join(siteDir, "starter");
cpSync(starterSource, starterTarget, { recursive: true });

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://headless.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://headless.kineticgain.com/</loc></url>\n  <url><loc>http://headless.kineticgain.com/architecture-lane/</loc></url>\n  <url><loc>http://headless.kineticgain.com/content-flow/</loc></url>\n  <url><loc>http://headless.kineticgain.com/verification/</loc></url>\n  <url><loc>http://headless.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
