# Journey Builder – Prefill Mapping UI

React + TypeScript app for configuring how form fields are prefilled from upstream forms (DAG) or global data.

---

## Run locally

```bash
yarn install
yarn dev
```

Run tests:

```bash
yarn test
```

---

## Core idea

Graph data is normalized into:

- `formsById` — fast lookup
- `reverseAdj` — parent relationships

Upstream forms are resolved using recursive traversal, collecting all parent forms (including indirect ones).

Field mappings are stored as:

```typescript
type MappingValue = {
  type: "form_field" | "global";
  sourceFormId?: string;
  sourceField?: string;
};
```

---

## Add a new data source

**1. Create a plugin:**

```typescript
import type { DataSourcePlugin } from "./types";

export const customSource: DataSourcePlugin = {
  id: "custom",
  label: "Custom",
  getOptions: () => [
    {
      label: "Example",
      value: {
        type: "global",
        sourceField: "example",
      },
    },
  ],
};
```

**2. Register it in `dataSources.ts`:**

```typescript
import { upstreamSource } from "./upstreamSource";
import { globalSource } from "./globalSource";
import { customSource } from "./customSource";

export const dataSources = [upstreamSource, globalSource, customSource];
```

No UI changes are required.

---

## Tests

Tests focus on core logic:

- normalization
- graph traversal
- data source plugins
