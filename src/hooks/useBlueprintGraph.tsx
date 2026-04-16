import { useEffect, useState } from "react";
import { fetchBlueprintGraph } from "../APIs/formsGraph";
import type { NormalizedGraph } from "../utils/normalization";

export function useBlueprintGraph(tenantId: number, actionBlueprintId: string) {
  const [data, setData] = useState<NormalizedGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchBlueprintGraph(tenantId, actionBlueprintId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [tenantId, actionBlueprintId]);

  return { data, loading, error };
}
