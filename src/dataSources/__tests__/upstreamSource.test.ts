import { describe, expect, it } from "vitest";
import { upstreamSource } from "../upstreamSource";
import type { NormalizedGraph } from "../../utils/normalization";

describe("upstreamSource", () => {
  const graph: NormalizedGraph = {
    formsById: {
      "form-a": {
        id: "form-a",
        name: "Form A",
        fields: ["id", "name", "email"],
      },
      "form-b": {
        id: "form-b",
        name: "Form B",
        fields: ["id", "email"],
      },
      "form-c": {
        id: "form-c",
        name: "Form C",
        fields: ["id", "name"],
      },
      "form-d": {
        id: "form-d",
        name: "Form D",
        fields: ["id", "name", "email"],
      },
      "form-e": {
        id: "form-e",
        name: "Form E",
        fields: ["id", "name", "email"],
      },
      "form-f": {
        id: "form-f",
        name: "Form F",
        fields: ["id", "name", "email"],
      },
    },
    reverseAdj: {
      "form-f": ["form-d", "form-e"],
      "form-d": ["form-b"],
      "form-e": ["form-c"],
      "form-b": ["form-a"],
      "form-c": ["form-a"],
      "form-a": [],
    },
    adjacency: {
      "form-a": ["form-b", "form-c"],
      "form-b": ["form-d"],
      "form-c": ["form-e"],
      "form-d": ["form-f"],
      "form-e": ["form-f"],
      "form-f": [],
    },
  };

  it("returns form field options from all upstream ancestors", () => {
    const result = upstreamSource.getOptions({
      currentFormId: "form-f",
      graph,
    });

    const labels = result.map((option) => option.label);

    expect(labels).toContain("Form A.email");
    expect(labels).toContain("Form B.id");
    expect(labels).toContain("Form C.name");
    expect(labels).toContain("Form D.email");
    expect(labels).toContain("Form E.name");
  });

  it("returns mapping values with form_field type", () => {
    const result = upstreamSource.getOptions({
      currentFormId: "form-d",
      graph,
    });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Form B.id",
          value: {
            type: "form_field",
            sourceFormId: "form-b",
            sourceField: "id",
          },
        }),
      ]),
    );
  });
});
