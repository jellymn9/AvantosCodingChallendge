import { describe, expect, it } from "vitest";
import { normalizeGraph } from "../normalization";

const mockGraphResponse = {
  nodes: [
    {
      id: "form-f",
      type: "form",
      data: {
        name: "Form F",
        component_id: "component-shared-1",
      },
    },
    {
      id: "form-d",
      type: "form",
      data: {
        name: "Form D",
        component_id: "component-shared-1",
      },
    },
    {
      id: "form-a",
      type: "form",
      data: {
        name: "Form A",
        component_id: "component-shared-1",
      },
    },
    {
      id: "form-c",
      type: "form",
      data: {
        name: "Form C",
        component_id: "component-c",
      },
    },
    {
      id: "form-b",
      type: "form",
      data: {
        name: "Form B",
        component_id: "component-b",
      },
    },
    {
      id: "form-e",
      type: "form",
      data: {
        name: "Form E",
        component_id: "component-shared-1",
      },
    },
  ],
  edges: [
    { source: "form-d", target: "form-f" },
    { source: "form-e", target: "form-f" },
    { source: "form-b", target: "form-d" },
    { source: "form-a", target: "form-c" },
    { source: "form-a", target: "form-b" },
    { source: "form-c", target: "form-e" },
  ],
  forms: [
    {
      id: "component-shared-1",
      field_schema: {
        properties: {
          id: {},
          name: {},
          email: {},
          notes: {},
        },
      },
    },
    {
      id: "component-b",
      field_schema: {
        properties: {
          id: {},
          email: {},
        },
      },
    },
    {
      id: "component-c",
      field_schema: {
        properties: {
          id: {},
          name: {},
        },
      },
    },
  ],
};

describe("normalizeGraph", () => {
  it("builds formsById by combining node metadata with form schema fields", () => {
    const result = normalizeGraph(mockGraphResponse);

    expect(result.formsById["form-a"]).toEqual({
      id: "form-a",
      name: "Form A",
      fields: ["id", "name", "email", "notes"],
    });

    expect(result.formsById["form-b"]).toEqual({
      id: "form-b",
      name: "Form B",
      fields: ["id", "email"],
    });

    expect(result.formsById["form-c"]).toEqual({
      id: "form-c",
      name: "Form C",
      fields: ["id", "name"],
    });
  });

  it("builds reverseAdj and adjacency correctly", () => {
    const result = normalizeGraph(mockGraphResponse);

    expect(result.reverseAdj["form-f"]).toEqual(["form-d", "form-e"]);
    expect(result.reverseAdj["form-d"]).toEqual(["form-b"]);
    expect(result.reverseAdj["form-b"]).toEqual(["form-a"]);
    expect(result.reverseAdj["form-a"]).toEqual([]);

    expect(result.adjacency["form-a"]).toEqual(["form-c", "form-b"]);
    expect(result.adjacency["form-b"]).toEqual(["form-d"]);
    expect(result.adjacency["form-f"]).toEqual([]);
  });
});
