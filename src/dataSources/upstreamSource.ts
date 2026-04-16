import type { DataSourcePlugin } from "./types";
import { getAncestors } from "../utils/normalization";

export const upstreamSource: DataSourcePlugin = {
  id: "upstream",
  label: "Upstream Forms",

  getOptions: ({ currentFormId, graph }) => {
    const ancestors = getAncestors(currentFormId, graph.reverseAdj);

    return ancestors.flatMap((ancestorId) => {
      const form = graph.formsById[ancestorId];
      if (!form) return [];

      return form.fields.map((field) => ({
        label: `${form.name}.${field}`,
        value: {
          type: "form_field",
          sourceFormId: ancestorId,
          sourceField: field,
        },
      }));
    });
  },
};
