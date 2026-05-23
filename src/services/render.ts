import { architectureLane, contentFlow, starterFiles, summary, verification } from "./headlessStarterService";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nav(activePath: string) {
  const items = [
    { href: "/", label: "Overview & Export", icon: "▣" },
    { href: "/architecture-lane", label: "Architecture Lane", icon: "◫" },
    { href: "/content-flow", label: "Publish Flow Path", icon: "↘" },
    { href: "/verification", label: "Operator Verification", icon: "☑" },
    { href: "/docs", label: "Integration Docs", icon: "?" }
  ];

  return items
    .map((item) => {
      const active = item.href === activePath ? "nav-pill active" : "nav-pill";
      return `<a class="${active}" href="${item.href}"><span class="nav-icon">${item.icon}</span>${item.label}</a>`;
    })
    .join("");
}

function layout(title: string, activePath: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #05081b;
        --surface: #0d132b;
        --surface-2: #10172f;
        --surface-3: #0a1023;
        --line: rgba(126, 156, 207, 0.16);
        --text: #f6f8ff;
        --muted: #8fa3c8;
        --blue: #2f6df6;
        --blue-soft: #66b7ff;
        --teal: #18d3b1;
        --good: #2ee0a3;
        --watch: #ffbf33;
        --critical: #d35c78;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        font-family: Inter, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(45, 109, 246, 0.12), transparent 24%),
          radial-gradient(circle at top center, rgba(24, 211, 177, 0.08), transparent 32%),
          linear-gradient(180deg, #040717 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1890px; margin: 0 auto; padding: 28px 28px 72px; }
      .masthead {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 24px;
        align-items: start;
        padding: 20px 22px 26px;
        background: linear-gradient(180deg, rgba(9, 13, 31, 0.98), rgba(8, 14, 31, 0.9));
        border: 1px solid rgba(130, 156, 207, 0.12);
        border-radius: 30px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 20px 60px rgba(0,0,0,0.28);
      }
      .system-chip {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 12px;
        letter-spacing: 0.16em;
        color: var(--muted);
      }
      .brand-pill {
        padding: 9px 14px;
        border-radius: 10px;
        border: 1px solid rgba(73, 122, 209, 0.35);
        background: rgba(18, 26, 55, 0.92);
        color: #8ec4ff;
        font-weight: 700;
      }
      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: var(--teal);
        box-shadow: 0 0 18px rgba(24, 211, 177, 0.45);
      }
      .hero-title {
        margin: 0;
        font-size: clamp(42px, 5.2vw, 72px);
        line-height: 0.96;
        letter-spacing: -0.05em;
        font-weight: 820;
      }
      .hero-title .accent {
        background: linear-gradient(90deg, #3e86ff 0%, #1ec8ff 52%, #18d3b1 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .hero-copy {
        margin: 16px 0 0;
        max-width: 1020px;
        font-size: 22px;
        line-height: 1.55;
        color: #a3b5d8;
      }
      .posture-card {
        min-width: 290px;
        padding: 26px 24px;
        border-radius: 24px;
        border: 1px solid var(--line);
        background: rgba(14, 20, 44, 0.92);
      }
      .posture-card .label,
      .eyebrow,
      .section-eyebrow {
        font-family: "IBM Plex Mono", Consolas, monospace;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 11px;
        color: #7fa9d8;
      }
      .posture-card .value {
        margin-top: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 18px;
        font-weight: 700;
      }
      .topnav {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 16px;
        margin-top: 20px;
      }
      .nav-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 64px;
        padding: 16px 20px;
        border-radius: 999px;
        border: 1px solid rgba(126, 156, 207, 0.14);
        background: rgba(20, 28, 53, 0.9);
        color: #93a7c8;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transition: transform 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
      }
      .nav-pill:hover {
        transform: translateY(-1px);
        border-color: rgba(140, 176, 238, 0.32);
        color: #dbe8ff;
      }
      .nav-pill.active {
        background: linear-gradient(135deg, #2f6df6, #397fff 58%, #285ad7);
        color: white;
        border-color: transparent;
        box-shadow: 0 14px 34px rgba(47, 109, 246, 0.26);
      }
      .nav-icon { font-size: 15px; opacity: 0.92; }
      .section {
        margin-top: 38px;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
      }
      .card {
        background: linear-gradient(180deg, rgba(14, 20, 44, 0.96), rgba(14, 20, 43, 0.92));
        border: 1px solid var(--line);
        border-radius: 28px;
        padding: 24px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
      }
      .metric-card {
        min-height: 194px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .metric-value {
        font-size: 64px;
        line-height: 1;
        letter-spacing: -0.04em;
        font-weight: 820;
      }
      .metric-split {
        display: flex;
        align-items: baseline;
        gap: 12px;
      }
      .metric-subtle {
        color: var(--muted);
        font-size: 14px;
        line-height: 1.55;
      }
      .recommendation {
        margin-top: 24px;
        display: grid;
        grid-template-columns: 64px 1fr;
        gap: 20px;
        border: 1px solid rgba(194, 136, 34, 0.35);
      }
      .warn-icon {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        border-radius: 16px;
        border: 1px solid rgba(194, 136, 34, 0.35);
        background: rgba(63, 39, 0, 0.24);
        font-size: 26px;
        color: var(--watch);
      }
      .recommendation .quote {
        margin: 12px 0 0;
        font-size: 22px;
        line-height: 1.45;
        font-weight: 720;
      }
      .recommendation .small {
        margin-top: 12px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }
      .explorer-grid {
        margin-top: 34px;
        display: grid;
        grid-template-columns: 0.92fr 1.08fr;
        gap: 24px;
        align-items: start;
      }
      .search-box {
        display: block;
        width: 100%;
        padding: 16px 18px;
        border-radius: 16px;
        border: 1px solid rgba(126, 156, 207, 0.14);
        background: rgba(8, 12, 28, 0.82);
        color: #7186aa;
        font-size: 15px;
      }
      .filter-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }
      .filter-chip {
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        background: rgba(13, 18, 39, 0.92);
        color: #9cb0d2;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .filter-chip.active {
        color: white;
        background: linear-gradient(135deg, #2f6df6, #397fff);
      }
      .starter-list {
        margin-top: 20px;
        display: grid;
        gap: 16px;
      }
      .starter-item {
        padding: 20px;
        border-radius: 20px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        background: rgba(13, 18, 39, 0.92);
      }
      .starter-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 10px;
        border: 1px solid rgba(75, 106, 168, 0.28);
        color: #8db6ff;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 12px;
        font-weight: 700;
      }
      pre.code-panel {
        margin: 0;
        padding: 32px;
        border-radius: 22px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        background: rgba(5, 9, 24, 0.97);
        color: #dbe7ff;
        font-size: 15px;
        line-height: 1.6;
        overflow: auto;
      }
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        padding: 18px 20px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        border-bottom: none;
        border-radius: 22px 22px 0 0;
        background: rgba(15, 21, 45, 0.96);
        color: #a6b8d7;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 13px;
      }
      .code-wrap pre.code-panel {
        border-radius: 0 0 22px 22px;
      }
      .section-title {
        margin: 8px 0 0;
        font-size: clamp(34px, 4vw, 56px);
        line-height: 1.05;
        letter-spacing: -0.045em;
        font-weight: 820;
      }
      .section-copy {
        margin: 10px 0 0;
        color: #a3b5d8;
        font-size: 19px;
        line-height: 1.55;
      }
      .architecture-grid,
      .docs-grid {
        display: grid;
        grid-template-columns: 1.42fr 0.68fr;
        gap: 24px;
      }
      .topology-card {
        padding: 28px;
      }
      .legend {
        display: flex;
        gap: 22px;
        justify-content: flex-end;
        color: #a4b5d4;
        font-family: "IBM Plex Mono", Consolas, monospace;
      }
      .legend span::before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 10px;
        border-radius: 999px;
        vertical-align: -2px;
      }
      .legend .healthy-dot::before { background: var(--good); }
      .legend .watch-dot::before { background: var(--watch); }
      .legend .critical-dot::before { background: var(--critical); }
      .topology-shell {
        margin-top: 22px;
        padding: 18px;
        border-radius: 24px;
        background: rgba(6, 10, 25, 0.95);
        border: 1px solid rgba(126, 156, 207, 0.08);
      }
      svg.topology {
        width: 100%;
        height: auto;
        display: block;
      }
      .node-button { cursor: pointer; transition: transform 160ms ease; }
      .node-button:hover { transform: translateY(-2px); }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 110px;
        padding: 7px 12px;
        border-radius: 999px;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        border: 1px solid transparent;
      }
      .badge.healthy { color: var(--good); background: rgba(46, 224, 163, 0.12); border-color: rgba(46, 224, 163, 0.22); }
      .badge.watch { color: var(--watch); background: rgba(255, 191, 51, 0.12); border-color: rgba(255, 191, 51, 0.22); }
      .badge.critical { color: var(--critical); background: rgba(211, 92, 120, 0.12); border-color: rgba(211, 92, 120, 0.22); }
      .inspector-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(126, 156, 207, 0.1);
      }
      .inspector-title {
        font-size: 17px;
        font-weight: 800;
        margin: 14px 0 0;
      }
      .inspector-copy {
        margin: 22px 0 0;
        color: #9db0cf;
        font-size: 14px;
        line-height: 1.7;
      }
      .override-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 18px;
      }
      .override-button {
        padding: 14px 10px;
        border-radius: 14px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        background: rgba(9, 13, 30, 0.96);
        color: #7f93b6;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .override-button.active.healthy { background: rgba(46, 224, 163, 0.12); color: var(--good); border-color: rgba(46, 224, 163, 0.24); }
      .override-button.active.watch { background: rgba(255, 191, 51, 0.12); color: var(--watch); border-color: rgba(255, 191, 51, 0.24); }
      .override-button.active.critical { background: rgba(211, 92, 120, 0.12); color: var(--critical); border-color: rgba(211, 92, 120, 0.24); }
      .mini-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 30px;
      }
      .mini-card {
        padding: 24px;
        border-radius: 22px;
        border: 1px solid rgba(126, 156, 207, 0.12);
        background: rgba(13, 18, 39, 0.92);
      }
      .flow-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 24px;
      }
      .flow-table th,
      .flow-table td {
        padding: 18px 10px;
        border-bottom: 1px solid rgba(126, 156, 207, 0.11);
        text-align: left;
        vertical-align: top;
      }
      .flow-table th {
        color: #7fa9d8;
        font-family: "IBM Plex Mono", Consolas, monospace;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 11px;
      }
      .flow-table td {
        color: #e9f1ff;
        line-height: 1.55;
        font-size: 15px;
      }
      .clean {
        margin: 18px 0 0;
        padding-left: 22px;
      }
      .clean li {
        margin-top: 14px;
        color: #dfe9fd;
        line-height: 1.65;
        font-size: 16px;
      }
      .docs-tabs {
        display: flex;
        gap: 42px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(126, 156, 207, 0.12);
      }
      .docs-tab {
        font-family: "IBM Plex Mono", Consolas, monospace;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 14px;
        font-weight: 800;
        color: #7f93b6;
      }
      .docs-tab.active {
        color: white;
        position: relative;
      }
      .docs-tab.active::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -18px;
        height: 3px;
        border-radius: 999px;
        background: var(--blue);
      }
      .spec-list {
        margin-top: 22px;
        display: grid;
        gap: 26px;
      }
      .spec-list strong {
        display: block;
        margin-bottom: 8px;
        color: #7f93b6;
        font-family: "IBM Plex Mono", Consolas, monospace;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.14em;
      }
      .spec-list p {
        margin: 0;
        color: #e7efff;
        font-size: 18px;
        line-height: 1.5;
        font-weight: 600;
      }
      .footer-note {
        margin-top: 18px;
        color: #88a5d4;
        font-size: 13px;
        line-height: 1.55;
      }
      @media (max-width: 1380px) {
        .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .topnav { grid-template-columns: 1fr; }
        .explorer-grid, .architecture-grid, .docs-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 900px) {
        .masthead { grid-template-columns: 1fr; }
        .metrics, .mini-grid, .override-grid { grid-template-columns: 1fr; }
        .shell { padding-inline: 16px; }
        .hero-copy, .section-copy { font-size: 17px; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="masthead">
        <div>
          <div class="system-chip">
            <span class="brand-pill">Kinetic Gain</span>
            <span>•</span>
            <span class="status-dot"></span>
            <span>System Control Plane</span>
          </div>
          <h1 class="hero-title">Headless WP <span class="accent">Vue Starter</span></h1>
          <p class="hero-copy">Decoupled WordPress delivery modeling typed schema route-mapping contracts, secure draft preview token bridges, and edge CDN cache posture guidelines.</p>
        </div>
        <aside class="posture-card">
          <div class="label">Environment Posture</div>
          <div class="value"><span class="status-dot"></span><span>Live Operator Console</span></div>
        </aside>
      </header>
      <nav class="topnav">${nav(activePath)}</nav>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const files = starterFiles();
  const fileCards = files
    .map(
      (file) => `
      <article class="starter-item">
        <div class="starter-tag">${esc(file.stack)}</div>
        <h3 style="margin:18px 0 10px;font-size:16px;font-family:'IBM Plex Mono',Consolas,monospace;">${esc(file.path)}</h3>
        <p style="margin:0;color:#b0c0dc;line-height:1.6;">${esc(file.purpose)}</p>
      </article>`
    )
    .join("");
  const firstRaw = files[files.length - 1];

  const body = `
    <section class="section">
      <div class="metrics">
        <article class="card metric-card">
          <div>
            <div class="section-eyebrow">Active Layers</div>
            <div class="metric-value">${stats.architectureNodeCount}</div>
          </div>
          <div class="metric-subtle">Operational layers mapped</div>
        </article>
        <article class="card metric-card">
          <div>
            <div class="section-eyebrow">Security & Health</div>
            <div class="metric-split"><span class="metric-value">${stats.healthy}</span><span style="font-size:42px;color:var(--watch);font-weight:820;">/ ${stats.watch}</span></div>
          </div>
          <div class="metric-subtle">Healthy / attention required</div>
        </article>
        <article class="card metric-card">
          <div>
            <div class="section-eyebrow">Flow Performance</div>
            <div class="metric-value" style="font-size:56px;">${stats.avgFlowLatency}<span style="font-size:26px;color:#9bb1d3;"> ms</span></div>
          </div>
          <div class="metric-subtle">Average publish propagation</div>
        </article>
        <article class="card metric-card">
          <div>
            <div class="section-eyebrow">Starter Files</div>
            <div class="metric-value">${stats.starterFileCount}</div>
          </div>
          <div class="metric-subtle">Production-ready scripts</div>
        </article>
      </div>
      <article class="card recommendation">
        <div class="warn-icon">⚠</div>
        <div>
          <div class="section-eyebrow" style="color:var(--watch);">Critical Architectural Recommendation</div>
          <p class="quote">"${esc(stats.recommendation)}"</p>
          <p class="small">Best use case: enterprise marketing websites requiring WordPress edit flexibility such as case studies, news items, and metadata updates without giving up pure Nuxt/Vue speed or SEO guarantees.</p>
        </div>
      </article>
      <div class="explorer-grid">
        <article class="card">
          <div class="section-eyebrow">Decoupled Posture Files</div>
          <h2 class="section-title" style="font-size:28px;">Starter Template Explorer</h2>
          <p class="section-copy" style="font-size:16px;">Select a production template to inspect the editorial connection framework.</p>
          <div class="search-box">Search templates by path or purpose...</div>
          <div class="filter-row">
            <span class="filter-chip active">All</span>
            <span class="filter-chip">Nuxt 3 / Vue</span>
            <span class="filter-chip">Nuxt Server Route</span>
            <span class="filter-chip">Vue</span>
            <span class="filter-chip">WordPress / PHP</span>
            <span class="filter-chip">Schema Contract</span>
          </div>
          <div class="starter-list">${fileCards}</div>
        </article>
        <div class="code-wrap">
          <div class="code-header">
            <span>${esc(firstRaw.path)}</span>
            <span>Copy Raw</span>
          </div>
          <pre class="code-panel">${esc(firstRaw.raw)}</pre>
        </div>
      </div>
    </section>`;

  return layout("Headless WP Vue Starter", "/", body);
}

function topologyScript() {
  return `<script>
    (() => {
      const initialNodes = ${JSON.stringify(architectureLane())};
      let nodes = initialNodes.map((node) => ({ ...node }));
      let selectedId = nodes[0]?.id;

      const $ = (id) => document.getElementById(id);
      const colors = {
        healthy: "#2ee0a3",
        watch: "#ffbf33",
        critical: "#d35c78",
        selected: "#3e86ff",
        muted: "#65789b"
      };

      function healthText(health) {
        return health.toUpperCase();
      }

      function iconForLayer(layer) {
        switch (layer) {
          case "wordpress": return "📁";
          case "graphql": return "⚡";
          case "vue": return "🟢";
          case "preview": return "🔑";
          case "edge": return "☄️";
          default: return "⚙️";
        }
      }

      function worstHealth(a, b) {
        const rank = { healthy: 1, watch: 2, critical: 3 };
        return rank[a] > rank[b] ? a : b;
      }

      function nodeById(id) {
        return nodes.find((node) => node.id === id);
      }

      function updateInspector() {
        const active = nodeById(selectedId);
        if (!active) return;
        $("inspector-id").textContent = active.id;
        $("inspector-layer").textContent = active.layer.toUpperCase();
        $("inspector-icon").textContent = iconForLayer(active.layer);
        $("inspector-name").textContent = active.name;
        $("inspector-responsibility").textContent = active.responsibility;
        $("inspector-explanation").textContent = active.explanation;
        const badge = $("inspector-health");
        badge.textContent = healthText(active.health);
        badge.className = "badge " + active.health;
        document.querySelectorAll(".override-button").forEach((button) => {
          const state = button.getAttribute("data-health");
          button.className = "override-button" + (state === active.health ? " active " + active.health : "");
        });
      }

      function updateMetrics() {
        const healthy = nodes.filter((node) => node.health === "healthy").length;
        const watch = nodes.filter((node) => node.health === "watch").length;
        const critical = nodes.filter((node) => node.health === "critical").length;
        $("metric-healthy").textContent = healthy;
        $("metric-watch").textContent = watch;
        $("metric-critical").textContent = critical;
      }

      function updateTopology() {
        nodes.forEach((node) => {
          const ring = $("ring-" + node.id);
          const pulse = $("pulse-" + node.id);
          const core = $("core-" + node.id);
          const label = $("label-" + node.id);
          const status = $("status-" + node.id);
          const selected = node.id === selectedId;
          ring.setAttribute("stroke", selected ? colors.selected : colors[node.health]);
          ring.setAttribute("stroke-width", selected ? "4" : "2");
          ring.setAttribute("opacity", selected ? "0.95" : "0.44");
          pulse.setAttribute("stroke", colors[node.health]);
          pulse.setAttribute("opacity", node.health === "healthy" ? "0.14" : "0.34");
          core.setAttribute("stroke", selected ? colors.selected : "#283149");
          label.setAttribute("fill", selected ? "#ffffff" : "#dbe7ff");
          status.textContent = node.id + " • " + healthText(node.health);
          status.setAttribute("fill", colors[node.health]);
        });

        [
          ["ARC-01","ARC-02","link-1"],
          ["ARC-01","ARC-04","link-2"],
          ["ARC-02","ARC-03","link-3"],
          ["ARC-04","ARC-03","link-4"],
          ["ARC-03","ARC-05","link-5"]
        ].forEach(([a, b, id]) => {
          const path = $(id);
          const glow = $(id + "-glow");
          const state = worstHealth(nodeById(a).health, nodeById(b).health);
          path.setAttribute("stroke", colors[state]);
          path.setAttribute("stroke-dasharray", state === "healthy" ? "0" : "8 8");
          glow.setAttribute("stroke", colors[state]);
          glow.setAttribute("stroke-dasharray", state === "healthy" ? "0" : "8 8");
          glow.setAttribute("opacity", state === "healthy" ? "0.22" : "0.32");
        });

        updateInspector();
        updateMetrics();
      }

      document.querySelectorAll(".node-button").forEach((button) => {
        button.addEventListener("click", () => {
          selectedId = button.getAttribute("data-node-id");
          updateTopology();
        });
      });

      document.querySelectorAll(".override-button").forEach((button) => {
        button.addEventListener("click", () => {
          const health = button.getAttribute("data-health");
          nodes = nodes.map((node) => {
            if (node.id !== selectedId) return node;
            return {
              ...node,
              health,
              explanation:
                health === "critical"
                  ? "This layer is now modeled as breaking trust, performance, or routing continuity and would block a calm production rollout."
                  : health === "watch"
                  ? "This layer is carrying elevated drift pressure and deserves hardening before larger editorial teams rely on it."
                  : "This layer is modeled as stable enough for an editorially trusted, SEO-conscious, independently deployable stack."
            };
          });
          updateTopology();
        });
      });

      $("reset-topology").addEventListener("click", () => {
        nodes = initialNodes.map((node) => ({ ...node }));
        selectedId = nodes[0]?.id;
        updateTopology();
      });

      updateTopology();
    })();
  </script>`;
}

export function renderArchitectureLane() {
  const nodes = architectureLane();
  const active = nodes[0];
  const body = `
    <section class="section">
      <div style="display:flex;justify-content:space-between;gap:20px;align-items:flex-start;">
        <div>
          <div class="section-eyebrow">System Taxonomy</div>
          <h2 class="section-title">Decoupled Multi-layer Topology</h2>
          <p class="section-copy">Review of responsibilities from editorial draft trigger to public CDN delivery posture.</p>
        </div>
        <button id="reset-topology" class="nav-pill" style="max-width:300px;">↺ Reset Health Schema</button>
      </div>
      <div class="architecture-grid" style="margin-top:24px;">
        <article class="card topology-card">
          <div style="display:flex;justify-content:space-between;gap:18px;align-items:flex-start;flex-wrap:wrap;">
            <div>
              <div class="section-eyebrow">Interactive Topology Diagram</div>
              <h3 style="margin:10px 0 0;font-size:22px;font-weight:800;">Kinetic Decoupled Data-Flow & Mesh Health</h3>
            </div>
            <div class="legend">
              <span class="healthy-dot">Healthy</span>
              <span class="watch-dot">Watch</span>
              <span class="critical-dot">Critical</span>
            </div>
          </div>
          <div class="topology-shell">
            <svg class="topology" viewBox="0 0 980 470" role="img" aria-label="Interactive architecture topology">
              <defs>
                <filter id="glow-blue"><feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <filter id="glow-node"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <marker id="arrow-healthy" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#2ee0a3"/></marker>
                <marker id="arrow-watch" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#ffbf33"/></marker>
                <marker id="arrow-critical" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="#d35c78"/></marker>
              </defs>
              <path id="link-1-glow" d="M140 222 L350 122" stroke-width="7" fill="none" opacity="0.24" marker-end="url(#arrow-watch)"></path>
              <path id="link-2-glow" d="M140 222 L352 327" stroke-width="7" fill="none" opacity="0.24" marker-end="url(#arrow-watch)"></path>
              <path id="link-3-glow" d="M388 138 L610 222" stroke-width="7" fill="none" opacity="0.24" marker-end="url(#arrow-watch)"></path>
              <path id="link-4-glow" d="M390 314 L610 223" stroke-width="7" fill="none" opacity="0.24" marker-end="url(#arrow-watch)"></path>
              <path id="link-5-glow" d="M646 222 L832 222" stroke-width="7" fill="none" opacity="0.22" marker-end="url(#arrow-healthy)"></path>

              <path id="link-1" d="M140 222 L350 122" stroke-width="3" fill="none" stroke="#ffbf33" stroke-dasharray="8 8" marker-end="url(#arrow-watch)"></path>
              <path id="link-2" d="M140 222 L352 327" stroke-width="3" fill="none" stroke="#ffbf33" stroke-dasharray="8 8" marker-end="url(#arrow-watch)"></path>
              <path id="link-3" d="M388 138 L610 222" stroke-width="3" fill="none" stroke="#ffbf33" stroke-dasharray="8 8" marker-end="url(#arrow-watch)"></path>
              <path id="link-4" d="M390 314 L610 223" stroke-width="3" fill="none" stroke="#ffbf33" stroke-dasharray="8 8" marker-end="url(#arrow-watch)"></path>
              <path id="link-5" d="M646 222 L832 222" stroke-width="3" fill="none" stroke="#2ee0a3" marker-end="url(#arrow-healthy)"></path>

              <text x="235" y="146" fill="#9caecb" font-family="IBM Plex Mono, Consolas, monospace" font-size="14" font-weight="700">Schema</text>
              <text x="238" y="287" fill="#9caecb" font-family="IBM Plex Mono, Consolas, monospace" font-size="14" font-weight="700">Token Bridge</text>
              <text x="480" y="147" fill="#9caecb" font-family="IBM Plex Mono, Consolas, monospace" font-size="14" font-weight="700">Query Results</text>
              <text x="480" y="287" fill="#9caecb" font-family="IBM Plex Mono, Consolas, monospace" font-size="14" font-weight="700">Bypass Auth</text>
              <text x="705" y="193" fill="#9caecb" font-family="IBM Plex Mono, Consolas, monospace" font-size="14" font-weight="700">Edge Delivery</text>

              ${[
                { id: "ARC-01", x: 110, y: 222, emoji: "📁", labelY: 324 },
                { id: "ARC-02", x: 352, y: 126, emoji: "⚡", labelY: 228 },
                { id: "ARC-03", x: 620, y: 222, emoji: "🟢", labelY: 324 },
                { id: "ARC-04", x: 352, y: 318, emoji: "🔑", labelY: 420 },
                { id: "ARC-05", x: 860, y: 222, emoji: "☄️", labelY: 324 }
              ]
                .map(
                  (node) => `
                <g class="node-button" data-node-id="${node.id}">
                  <circle id="pulse-${node.id}" cx="${node.x}" cy="${node.y}" r="42" fill="none" stroke="#2ee0a3" stroke-width="1.5" opacity="0.2"></circle>
                  <circle id="ring-${node.id}" cx="${node.x}" cy="${node.y}" r="30" fill="none" stroke="#3e86ff" stroke-width="4" opacity="0.9"></circle>
                  <circle id="core-${node.id}" cx="${node.x}" cy="${node.y}" r="24" fill="#11182f" stroke="#283149" stroke-width="2" filter="url(#glow-node)"></circle>
                  <text x="${node.x}" y="${node.y + 6}" text-anchor="middle" font-size="18">${node.emoji}</text>
                  <text id="label-${node.id}" x="${node.x}" y="${node.labelY}" text-anchor="middle" fill="#dbe7ff" font-family="Inter, Segoe UI, sans-serif" font-size="18" font-weight="800">${nodeByIdText(node.id, nodes)}</text>
                  <text id="status-${node.id}" x="${node.x}" y="${node.labelY + 24}" text-anchor="middle" fill="#2ee0a3" font-family="IBM Plex Mono, Consolas, monospace" font-size="13" font-weight="700">${node.id} • ${nodeByIdHealth(node.id, nodes)}</text>
                </g>`
                )
                .join("")}
            </svg>
          </div>
          <div class="footer-note">Interactive: click any node in the diagram above to inspect its real-time posture and simulate health overrides in the side panel.</div>
          <div class="mini-grid">
            <article class="mini-card">
              <div class="section-eyebrow">Healthy Layers</div>
              <div id="metric-healthy" style="margin-top:12px;font-size:42px;font-weight:820;">3</div>
            </article>
            <article class="mini-card">
              <div class="section-eyebrow">Layers Under Watch</div>
              <div id="metric-watch" style="margin-top:12px;font-size:42px;font-weight:820;color:var(--watch);">2</div>
            </article>
          </div>
        </article>
        <aside class="card">
          <div class="inspector-header">
            <div class="section-eyebrow">Layer Inspector</div>
            <div id="inspector-id" class="starter-tag" style="padding:8px 12px;">${active.id}</div>
          </div>
          <div style="display:flex;gap:14px;align-items:center;margin-top:20px;">
            <div id="inspector-icon" style="font-size:34px;">📁</div>
            <div id="inspector-layer" class="section-eyebrow">${active.layer.toUpperCase()}</div>
          </div>
          <h3 id="inspector-name" class="inspector-title">${esc(active.name)}</h3>
          <div id="inspector-health" class="badge ${active.health}" style="margin-top:18px;">${active.health.toUpperCase()}</div>
          <div class="inspector-copy">
            <div class="section-eyebrow" style="margin-bottom:8px;">Primary Responsibility</div>
            <div id="inspector-responsibility" style="color:#edf3ff;font-size:18px;font-weight:700;line-height:1.6;">${esc(active.responsibility)}</div>
          </div>
          <div class="inspector-copy">
            <div class="section-eyebrow" style="margin-bottom:8px;">Deployment Posture / Risk Statement</div>
            <div id="inspector-explanation">${esc(active.explanation)}</div>
          </div>
          <div class="inspector-copy" style="padding-top:22px;border-top:1px solid rgba(126, 156, 207, 0.1);">
            <div class="section-eyebrow" style="color:#7fa9d8;">Simulated Override Controller</div>
            <div style="margin-top:8px;color:#869bc0;">Toggle health parameters to simulate failover tolerance inside the architecture control plane.</div>
            <div class="override-grid">
              <button class="override-button active healthy" data-health="healthy">Healthy</button>
              <button class="override-button" data-health="watch">Watch</button>
              <button class="override-button" data-health="critical">Critical</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
    ${topologyScript()}`;

  return layout("Headless WP Vue Starter - Architecture Lane", "/architecture-lane", body);
}

function nodeByIdText(id: string, nodes: ReturnType<typeof architectureLane>) {
  return nodes.find((node) => node.id === id)?.name.replace("WordPress ", "WP ").replace("WPGraphQL ", "").replace("Nuxt ", "").replace("Cache and redirect ", "") ?? id;
}

function nodeByIdHealth(id: string, nodes: ReturnType<typeof architectureLane>) {
  return (nodes.find((node) => node.id === id)?.health ?? "healthy").toUpperCase();
}

export function renderContentFlow() {
  const rows = contentFlow()
    .map(
      (step) => `
      <tr>
        <td>${esc(step.step)}</td>
        <td>${esc(step.owner)}</td>
        <td><span class="badge ${step.health}">${step.health}</span></td>
        <td>${step.latencyMs}ms</td>
        <td>${esc(step.explanation)}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="section">
      <div class="section-eyebrow">Publish Flow Path</div>
      <h2 class="section-title">From draft trigger to public route delivery.</h2>
      <p class="section-copy">This route shows where content, preview auth, schema mapping, and edge caching have to cooperate if a headless program wants both editorial trust and campaign-grade speed.</p>
      <article class="card" style="margin-top:24px;">
        <div class="section-eyebrow">Operator Sequence</div>
        <table class="flow-table">
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

  return layout("Headless WP Vue Starter - Publish Flow Path", "/content-flow", body);
}

export function renderVerification() {
  const body = `
    <section class="section">
      <div class="section-eyebrow">Operator Verification</div>
      <h2 class="section-title">What this starter validates before a team scales it.</h2>
      <p class="section-copy">The build is designed to prove that a decoupled WordPress program can stay operable under real editorial pressure instead of collapsing into disconnected CMS and frontend ownership.</p>
      <article class="card" style="margin-top:24px;">
        <div class="section-eyebrow">Release Checks</div>
        <ul class="clean">
          ${verification().map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Headless WP Vue Starter - Operator Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="section">
      <div class="docs-tabs">
        <div class="docs-tab active">System Architecture Guide</div>
        <div class="docs-tab">Kinetic Origin & Posture</div>
      </div>
      <div class="docs-grid" style="margin-top:48px;">
        <article class="card">
          <div class="section-eyebrow">System Artifact / Principal Technical Spec</div>
          <h2 class="section-title">Headless WordPress + Vue Architecture</h2>
          <p class="section-copy">How to safely decouple CMS layers without losing editorial trust, metadata stability, or cache accuracy.</p>
          <div style="margin-top:32px;">
            <div class="section-eyebrow">Primary Purpose</div>
            <p style="margin:14px 0 0;font-size:18px;line-height:1.8;color:#dfe9fd;">The <code style="background:rgba(13,18,39,0.92);padding:5px 10px;border-radius:10px;border:1px solid rgba(126,156,207,0.12);color:#9ed3ff;">headless-wp-vue-starter</code> models the decoupled CMS layer that sits cleanly between standard WordPress editorial workflows and high-speed Vue (Nuxt) interactive delivery layers. By modeling draft URL previews and structured GraphQL schema validation contracts explicitly, it takes headless setup from a fragile diagram into a practical, buildable, secure starter template.</p>
          </div>
          <div style="margin-top:34px;">
            <div class="section-eyebrow">Application Shape Mapping</div>
            <div class="mini-grid">
              <article class="mini-card">
                <div class="section-eyebrow">Control Surface</div>
                <div style="margin-top:10px;font-size:18px;font-weight:800;">src/app.ts</div>
                <p class="footer-note">Express application hosting HTML diagnostics views and machine-readable JSON REST API requests.</p>
              </article>
              <article class="mini-card">
                <div class="section-eyebrow">Schema Contracts</div>
                <div style="margin-top:10px;font-size:18px;font-weight:800;">starter/wpgraphql/</div>
                <p class="footer-note">Strict mappings defining how specific custom post types render matching Vue route templates.</p>
              </article>
            </div>
          </div>
        </article>
        <aside class="card">
          <div class="section-eyebrow">Spec Classification</div>
          <div class="spec-list">
            <div>
              <strong>Target Platform</strong>
              <p>Node.js Web Runtime (Express / Vite)</p>
            </div>
            <div>
              <strong>Architecture Role</strong>
              <p>Principal Platform Engineer</p>
            </div>
            <div>
              <strong>Signal Metric Target</strong>
              <p style="color:var(--good);">96% Uptime / Scale Ready</p>
            </div>
            <div>
              <strong>Active Focus</strong>
              <p>Headless CMS, Security Token Bridges, SEO delivery, Core Web Vitals</p>
            </div>
          </div>
        </aside>
      </div>
    </section>`;

  return layout("Headless WP Vue Starter - Integration Docs", "/docs", body);
}
