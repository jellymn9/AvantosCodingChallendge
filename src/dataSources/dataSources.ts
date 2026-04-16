import type { DataSourcePlugin } from "./types";
import { upstreamSource } from "./upstreamSource";
import { globalSource } from "./globalSource";

export const dataSources: Array<DataSourcePlugin> = [
  upstreamSource,
  globalSource,
];
