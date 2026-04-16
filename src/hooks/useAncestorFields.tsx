import { useMemo } from "react";
import { getAncestors } from "../utils/normalization";
import type { NormalizedGraph } from "../utils/normalization";

type Option = {
  label: string;
  value: {
    sourceFormId: string;
    sourceField: string;
  };
};

export function useAncestorFields(
  formId: string | null,
  graph: NormalizedGraph,
): Option[] {
  return useMemo(() => {
    if (!formId) return [];

    const ancestors = getAncestors(formId, graph.reverseAdj);

    return ancestors.flatMap((ancestorId) => {
      const form = graph.formsById[ancestorId];
      if (!form) return [];

      return form.fields.map((field) => ({
        label: `${form.name}.${field}`,
        value: {
          sourceFormId: ancestorId,
          sourceField: field,
        },
      }));
    });
  }, [formId, graph]);
}
