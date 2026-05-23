import { architectureLane, contentFlow, starterFiles, summary, verification } from "./headlessStarterService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/architecture-lane", label: "Architecture Lane" },
    { href: "/content-flow", label: "Content Flow" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #081018;
        --panel-soft: rgba(19, 28, 42, 0.86);
        --line: rgba(146, 186, 255, 0.14);
        --text: #f5f7ff;
        --muted: #9fb4d1;
        --accent: #64d0ff;
        --accent-strong: #5b7cff;
        --good: #35d59d;
        --watch: #f0bf54;
        --bad: #ff778f;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(100, 208, 255, 0.14), transparent 28%),
          radial-gradient(circle at top right, rgba(91, 124, 255, 0.14), transparent 26%),
          linear-gradient(180deg, #061019 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line); border-radius: 24px;
        background: rgba(7, 14, 26, 0.82); box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand { display: flex; align-items: center; gap: 14px; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow { margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: #93c9ff; }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(16, 27, 43, 0.9); color: #d7e6ff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(100, 208, 255, 0.95), rgba(91, 124, 255, 0.92));
        border-color: transparent; color: white; box-shadow: 0 10px 24px rgba(79, 145, 255, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px; border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 940px; font-size: clamp(40px, 4.9vw, 68px);
        line-height: 0.96; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 21px; line-height: 1.5; color: #b8c8e4; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel-soft); }
      .metric-label { color: #8fb6ea; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #8fb6ea; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #e9f1ff; font-size: 14px; line-height: 1.45; }
      .badge { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
      .healthy { background: rgba(53, 213, 157, 0.14); color: var(--good); }
      .watch { background: rgba(240, 191, 84, 0.14); color: var(--watch); }
      .critical { background: rgba(255, 119, 143, 0.14); color: var(--bad); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #dbe7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      .footer-note { margin-top: 20px; color: #88a5d4; font-size: 13px; letter-spacing: 0.04em; }
      code.inline { color: #cde7ff; }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">HV</div>
          <div>
            <p class="eyebrow">Web Platform</p>
            <h1 class="brand-title">Headless WP Vue Starter</h1>
            <p class="brand-subtitle">Decoupled WordPress delivery with preview-safe Vue rendering.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const starterMarkup = starterFiles()
    .map(
      (file) => `
      <tr>
        <td><code class="inline">${file.path}</code></td>
        <td>${file.stack}</td>
        <td>${file.purpose}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Headless Delivery Control Plane</p>
      <h1>WordPress can stay editorial-first while Vue owns speed, routing, and SEO.</h1>
      <p>This starter models the practical parts of a decoupled marketing stack: WPGraphQL contracts, preview-safe routing, route mapping, and a frontend shell that can move fast without abandoning editorial teams.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Architecture Nodes</div>
          <div class="metric-value">${stats.architectureNodeCount}</div>
          <div class="metric-copy">Modeled layers across WordPress, GraphQL, Vue, preview, and edge delivery.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Healthy</div>
          <div class="metric-value">${stats.healthy}</div>
          <div class="metric-copy">Layers that are strong enough to ship without eroding speed or editorial trust.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Watch</div>
          <div class="metric-value">${stats.watch}</div>
          <div class="metric-copy">Layers that usually fail first when preview or schema discipline is weak.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Flow Latency</div>
          <div class="metric-value">${stats.avgFlowLatency}ms</div>
          <div class="metric-copy">Average modeled latency across the publish-to-render content path.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Starter Files</div>
          <div class="metric-value">${stats.starterFileCount}</div>
          <div class="metric-copy">Concrete starter artifacts included to prove the architecture is buildable.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to harden first</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <p class="footer-note">Best use case: enterprise marketing sites that need WordPress editorial flexibility without giving up Vue speed or SEO control.</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Coverage</p>
          <h2 class="section-title">What this starter proves</h2>
          <ul class="clean">
            <li><strong>WPGraphQL contract discipline</strong> — content types and route mapping stay explicit.</li>
            <li><strong>Preview-safe rendering</strong> — drafts can flow through the frontend without poisoning public caches.</li>
            <li><strong>Decoupled delivery</strong> — Vue owns route speed, metadata, and component control while WordPress stays editorial-first.</li>
          </ul>
        </article>
      </div>
      <article class="panel">
        <p class="eyebrow">Starter Export</p>
        <h2 class="section-title">The concrete files that make the architecture credible.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Path</th>
              <th>Stack</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>${starterMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Headless WP Vue Starter", "/", body);
}

export function renderArchitectureLane() {
  const rows = architectureLane()
    .map(
      (node) => `
      <tr>
        <td>${node.layer}</td>
        <td>${node.name}</td>
        <td><span class="badge ${node.health}">${node.health}</span></td>
        <td>${node.responsibility}</td>
        <td>${node.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Architecture Lane</p>
      <h1>Every layer has to earn its place in a decoupled stack.</h1>
      <p>This lane keeps WordPress, GraphQL, Vue, preview, and edge responsibilities distinct so the frontend stays fast without making the CMS brittle.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Architecture Nodes</p>
        <h2 class="section-title">Layer posture across the starter.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Name</th>
              <th>Health</th>
              <th>Responsibility</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Headless WP Vue Starter - Architecture Lane", "/architecture-lane", body);
}

export function renderContentFlow() {
  const rows = contentFlow()
    .map(
      (step) => `
      <tr>
        <td>${step.step}</td>
        <td>${step.owner}</td>
        <td><span class="badge ${step.health}">${step.health}</span></td>
        <td>${step.latencyMs}ms</td>
        <td>${step.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Content Flow</p>
      <h1>The publish path matters as much as the frontend shell.</h1>
      <p>This flow shows how content moves from editorial change to GraphQL exposure to Vue rendering and preview unlocks, with the fragile steps made explicit instead of assumed.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Publish Path</p>
        <h2 class="section-title">From WordPress edit to public route.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Owner</th>
              <th>Health</th>
              <th>Latency</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Headless WP Vue Starter - Content Flow", "/content-flow", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves headless WordPress needs both governance and delivery discipline.</h1>
      <p>The point is not just to decouple the frontend. The point is to preserve speed, preview trust, and schema clarity while editorial teams stay productive.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Headless WP Vue Starter - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a decoupled CMS starter for speed, governance, and editorial trust.</h1>
      <p>This repo sits at the intersection of WordPress governance, Vue delivery, preview safety, and SEO-conscious routing. It is designed to show how a headless stack can stay practical instead of becoming a fragile rewrite story.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and starter export posture</li>
            <li><code>/architecture-lane</code> layer-by-layer system view</li>
            <li><code>/content-flow</code> publish path and preview flow</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/architecture-lane</code></li>
            <li><code>/api/content-flow</code></li>
            <li><code>/api/starter-files</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Headless WP Vue Starter - Docs", "/docs", body);
}
