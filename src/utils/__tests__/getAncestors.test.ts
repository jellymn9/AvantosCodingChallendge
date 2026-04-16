import { describe, expect, it } from "vitest";
import { getAncestors } from "../normalization";

describe("getAncestors", () => {
  const reverseAdj = {
    "form-f": ["form-d", "form-e"],
    "form-d": ["form-b"],
    "form-e": ["form-c"],
    "form-b": ["form-a"],
    "form-c": ["form-a"],
    "form-a": [],
  };

  it("returns all direct and transitive ancestors for a branching DAG", () => {
    const ancestors = getAncestors("form-f", reverseAdj);

    expect(new Set(ancestors)).toEqual(
      new Set(["form-d", "form-e", "form-b", "form-c", "form-a"]),
    );
  });

  it("returns the parent chain for a non-branching node", () => {
    const ancestors = getAncestors("form-d", reverseAdj);

    expect(new Set(ancestors)).toEqual(new Set(["form-b", "form-a"]));
  });

  it("does not return duplicate ancestors when multiple paths converge", () => {
    const reverseAdjWithExtraPath = {
      "form-f": ["form-d", "form-e"],
      "form-d": ["form-b"],
      "form-e": ["form-c"],
      "form-b": ["form-a"],
      "form-c": ["form-a", "form-b"],
      "form-a": [],
    };

    const ancestors = getAncestors("form-f", reverseAdjWithExtraPath);

    expect(ancestors.filter((id) => id === "form-a")).toHaveLength(1);
    expect(ancestors.filter((id) => id === "form-b")).toHaveLength(1);
  });
});
