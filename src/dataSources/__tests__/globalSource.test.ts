import { describe, expect, it } from "vitest";
import { globalSource } from "../globalSource";

describe("globalSource", () => {
  it("returns global mapping options with correct shape", () => {
    const result = globalSource.getOptions({
      currentFormId: "form-a",
      graph: {
        formsById: {},
        reverseAdj: {},
        adjacency: {},
      },
    });

    expect(result).toEqual([
      {
        label: "Current User ID",
        value: {
          type: "global",
          sourceField: "userId",
        },
      },
      {
        label: "Current Date",
        value: {
          type: "global",
          sourceField: "date",
        },
      },
    ]);
  });
});
