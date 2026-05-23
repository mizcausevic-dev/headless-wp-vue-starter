import { architectureNodes, contentFlowSteps, starterFilesData } from "../data/sampleStarter";

export function summary() {
  const healthy = architectureNodes.filter((node) => node.health === "healthy").length;
  const watch = architectureNodes.filter((node) => node.health === "watch").length;
  const avgFlowLatency = Math.round(contentFlowSteps.reduce((total, step) => total + step.latencyMs, 0) / contentFlowSteps.length);

  return {
    architectureNodeCount: architectureNodes.length,
    healthy,
    watch,
    avgFlowLatency,
    starterFileCount: starterFilesData.length,
    recommendation:
      "Harden the preview bridge first, because editor trust collapses quickly when draft rendering and cache bypass feel unreliable."
  };
}

export function architectureLane() {
  return architectureNodes;
}

export function contentFlow() {
  return contentFlowSteps;
}

export function starterFiles() {
  return starterFilesData;
}

export function verification() {
  return [
    "The starter shows how WordPress remains the editorial core while Vue owns speed, routing, and metadata control.",
    "The preview bridge is modeled as a first-class concern instead of an afterthought, which is critical in real headless rollouts.",
    "The route and schema mapping layer makes it clear where governance and frontend flexibility need to meet."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    architecture: architectureLane(),
    flow: contentFlow(),
    starterFiles: starterFiles(),
    verification: verification()
  };
}
