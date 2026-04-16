import { normalizeGraph, type NormalizedGraph } from "../utils/normalization";

export async function fetchBlueprintGraph(
  tenantId: number,
  blueprintId: string,
): Promise<NormalizedGraph> {
  const res = await fetch(
    `http://localhost:3000//api/v1/${tenantId}/actions/blueprints/${blueprintId}/graph`,
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const raw = await res.json();
  return normalizeGraph(raw);
}
