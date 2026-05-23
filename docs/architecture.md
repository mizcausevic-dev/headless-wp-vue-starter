# Headless WP Vue Starter Architecture

## Purpose

`headless-wp-vue-starter` models the decoupled CMS layer that sits between WordPress editorial workflows and Vue frontend delivery. It turns headless architecture into a concrete, preview-safe starter instead of a vague diagram.

## Application Shape

- `src/app.ts`
  - Express entrypoint
  - HTML routes for overview, architecture lane, content flow, verification, and docs
  - JSON routes for summary, architecture lane, content flow, starter files, and sample payloads
- `src/data/sampleStarter.ts`
  - modeled architecture nodes
  - content-flow steps
  - starter export file inventory
- `src/services/headlessStarterService.ts`
  - summary calculations
  - machine-readable architecture outputs
  - verification claims
- `src/services/render.ts`
  - operator UI shell
  - overview metrics and architecture tables
  - publish-flow and starter export views
- `starter/`
  - concrete Nuxt, WordPress, and schema-contract proof files

## Control Surface Logic

### Overview
- shows the main layers in the headless system
- keeps preview trust, frontend speed, and schema discipline in one frame
- makes the starter credible as an architecture asset, not just a static concept

### Architecture Lane
- makes each layer's role explicit
- compares WordPress, GraphQL, Vue, preview, and edge responsibilities together
- shows where governance and delivery usually separate clean stacks from fragile ones

### Content Flow
- summarizes the publish path from editorial change to rendered route
- keeps preview and route mapping visible enough to reason about trust and latency
- helps explain why headless adoption fails when the bridge between systems is underspecified

### Verification
- lists the core claims the build is proving
- keeps the README screenshots tied to real modeled behavior

## Why This Repo Matters

The repo shows how a decoupled WordPress frontend can be framed as revenue and platform infrastructure:

- faster marketing delivery without abandoning editorial workflows
- safer preview handling
- clearer route and schema ownership
- better SEO and caching control on the frontend layer
