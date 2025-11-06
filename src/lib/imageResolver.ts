type WithImages = { src?: string; images?: string[]; previewIndex?: number };

const preloaded = new Set<string>();

function dedupe(list: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

export function getImageCandidates(
  project?: WithImages,
  opts?: { preferSrcFirst?: boolean; preferredIndex?: number },
): string[] {
  if (!project) return [];
  const index = opts?.preferredIndex ?? project.previewIndex ?? 0;
  const firstImage = project.images?.[index];
  const ordered = opts?.preferSrcFirst
    ? [project.src, firstImage, ...(project.images || [])]
    : [firstImage, project.src, ...(project.images || [])];
  return dedupe(ordered);
}

export function getNextCandidate(candidates: string[], tried: string): string | null {
  const idx = candidates.findIndex((c) => c === tried);
  for (let i = idx + 1; i < candidates.length; i++) {
    if (candidates[i] && candidates[i] !== tried) return candidates[i];
  }
  return null;
}

export function preloadImages(urls: string[]) {
  urls.forEach((u) => {
    if (!u || preloaded.has(u)) return;
    const img = new Image();
    img.src = u;
    preloaded.add(u);
  });
}