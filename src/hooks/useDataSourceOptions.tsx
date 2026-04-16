import { useMemo } from "react";
import { dataSources } from "../dataSources/dataSources";
import type { NormalizedGraph } from "../utils/normalization";
import type { DataSourceOption } from "../dataSources/types";

export type GroupedOptions = {
  label: string;
  options: Array<DataSourceOption>;
};

export function useDataSourceOptions(
  formId: string | null,
  graph: NormalizedGraph | null,
): Array<GroupedOptions> {
  return useMemo(() => {
    if (!formId || !graph) return [];

    return dataSources.map((source) => ({
      label: source.label,
      options: source.getOptions({
        currentFormId: formId,
        graph,
      }),
    }));
  }, [formId, graph]);
}
