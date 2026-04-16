import type { DataSourcePlugin } from "./types";

export const globalSource: DataSourcePlugin = {
  id: "global",
  label: "Global Data",

  getOptions: () => {
    return [
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
    ];
  },
};
