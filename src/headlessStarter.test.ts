import { describe, expect, it } from "vitest";

import { architectureLane, contentFlow, payload, starterFiles, summary } from "./services/headlessStarterService";

describe("headless-wp-vue-starter", () => {
  it("summary exposes starter posture", () => {
    const result = summary();

    expect(result.architectureNodeCount).toBeGreaterThan(0);
    expect(result.starterFileCount).toBeGreaterThan(0);
    expect(result.recommendation).toContain("preview");
  });

  it("architecture and starter files stay concrete", () => {
    expect(architectureLane().length).toBeGreaterThan(1);
    expect(starterFiles().some((file) => file.path.includes("nuxt.config.ts"))).toBe(true);
    expect(contentFlow().some((step) => step.step.toLowerCase().includes("preview"))).toBe(true);
  });

  it("payload bundles the full surface", () => {
    const result = payload();

    expect(result.dashboard.architectureNodeCount).toBe(result.architecture.length);
    expect(result.flow.length).toBeGreaterThan(0);
    expect(result.starterFiles.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
