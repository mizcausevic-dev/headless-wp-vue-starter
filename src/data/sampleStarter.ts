export type Health = "healthy" | "watch" | "critical";

export interface ArchitectureNode {
  id: string;
  layer: "wordpress" | "graphql" | "vue" | "preview" | "edge";
  name: string;
  health: Health;
  responsibility: string;
  explanation: string;
}

export interface ContentFlowStep {
  id: string;
  step: string;
  owner: string;
  latencyMs: number;
  health: Health;
  explanation: string;
}

export interface StarterFile {
  path: string;
  purpose: string;
  stack: string;
  category: "nuxt" | "server-route" | "vue" | "wordpress" | "schema";
  raw: string;
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "ARC-01",
    layer: "wordpress",
    name: "WordPress editorial core",
    health: "healthy",
    responsibility: "Own posts, pages, case studies, navigation, and preview token issuance.",
    explanation: "Editorial ownership stays in WordPress while the frontend remains fast and independently deployable."
  },
  {
    id: "ARC-02",
    layer: "graphql",
    name: "WPGraphQL schema contract",
    health: "watch",
    responsibility: "Expose typed route, SEO, and component fields to the frontend query layer.",
    explanation: "Schema discipline is the boundary that keeps content flexibility from breaking frontend rendering."
  },
  {
    id: "ARC-03",
    layer: "vue",
    name: "Nuxt rendering shell",
    health: "healthy",
    responsibility: "Handle route rendering, metadata, caching posture, and component mapping.",
    explanation: "The Vue layer delivers speed and SEO control without forcing editorial teams into a frontend workflow."
  },
  {
    id: "ARC-04",
    layer: "preview",
    name: "Preview token bridge",
    health: "watch",
    responsibility: "Translate preview URLs and signed tokens into safe draft rendering.",
    explanation: "Preview safety is usually the weak point in headless stacks, so the bridge deserves first-class treatment."
  },
  {
    id: "ARC-05",
    layer: "edge",
    name: "Cache and redirect edge",
    health: "healthy",
    responsibility: "Preserve canonical routes, cache valid pages, and keep migrations safe.",
    explanation: "Fast response and stable routing are what make the headless split commercially viable, not just technically interesting."
  }
];

export const contentFlowSteps: ContentFlowStep[] = [
  {
    id: "FLOW-01",
    step: "Editor publishes a case study in WordPress",
    owner: "Content team",
    latencyMs: 0,
    health: "healthy",
    explanation: "Publishing starts in the familiar CMS, not in the frontend repo."
  },
  {
    id: "FLOW-02",
    step: "WPGraphQL exposes route, SEO fields, and component payload",
    owner: "CMS schema layer",
    latencyMs: 140,
    health: "healthy",
    explanation: "Structured fields stay consistent enough for frontend consumption and indexing."
  },
  {
    id: "FLOW-03",
    step: "Nuxt maps content type to Vue route component",
    owner: "Frontend delivery",
    latencyMs: 96,
    health: "watch",
    explanation: "The mapping layer is powerful, but weak contracts here become broken routes or half-rendered pages."
  },
  {
    id: "FLOW-04",
    step: "Preview token unlocks draft rendering",
    owner: "Preview bridge",
    latencyMs: 220,
    health: "watch",
    explanation: "Preview auth and cache bypass have to be precise or editors lose trust in the stack."
  },
  {
    id: "FLOW-05",
    step: "Edge caches public route and preserves canonical metadata",
    owner: "Platform delivery",
    latencyMs: 44,
    health: "healthy",
    explanation: "The final output needs to stay fast enough for search and stable enough for campaigns."
  }
];

export const starterFilesData: StarterFile[] = [
  {
    path: "starter/nuxt/nuxt.config.ts",
    purpose: "Define runtime config, route rules, and WPGraphQL endpoint wiring for Nuxt.",
    stack: "Nuxt 3 / Vue",
    category: "nuxt",
    raw: `export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      wpgraphqlEndpoint: process.env.NUXT_PUBLIC_WPGRAPHQL_ENDPOINT
    }
  },
  routeRules: {
    "/preview/**": { swr: false, cache: false },
    "/**": { swr: 300 }
  }
});`
  },
  {
    path: "starter/nuxt/server/api/preview.ts",
    purpose: "Handle signed preview tokens and redirect editors into safe draft routes.",
    stack: "Nuxt server route",
    category: "server-route",
    raw: `export default defineEventHandler(async (event) => {
  const token = getQuery(event).token;
  const slug = getQuery(event).slug;
  if (!token || !slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing preview payload" });
  }
  return sendRedirect(event, \`/preview/\${slug}?token=\${token}\`);
});`
  },
  {
    path: "starter/nuxt/app.vue",
    purpose: "Provide the root shell and shared layout mount for the decoupled frontend.",
    stack: "Vue",
    category: "vue",
    raw: `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>`
  },
  {
    path: "starter/wordpress/wp-content/mu-plugins/headless-preview-bridge.php",
    purpose: "Issue preview-safe URLs and align WordPress preview actions with the headless frontend.",
    stack: "WordPress / PHP",
    category: "wordpress",
    raw: `<?php
add_filter('preview_post_link', function ($preview_link, $post) {
    $token = wp_create_nonce('headless-preview');
    return sprintf('https://frontend.example/preview/%s?token=%s', $post->post_name, $token);
}, 10, 2);`
  },
  {
    path: "starter/wpgraphql/content-map.json",
    purpose: "Document how post types and templates map into Vue route components.",
    stack: "Schema contract",
    category: "schema",
    raw: `{
  "page": "PageTemplate",
  "post": "ArticleTemplate",
  "caseStudy": "CaseStudyTemplate",
  "landingPage": "LandingPageTemplate"
}`
  }
];
