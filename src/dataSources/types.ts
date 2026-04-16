import type { NormalizedGraph } from "../utils/normalization";
import type { MappingValue } from "../types/mapping";

export type DataSourceOption = {
  label: string;
  value: MappingValue;
  // {
  //   sourceFormId?: string;
  //   sourceField?: string;
  //   type: string;
  // };
};

export type DataSourceContext = {
  currentFormId: string;
  graph: NormalizedGraph;
};

export type DataSourcePlugin = {
  id: string;
  label: string;

  getOptions: (ctx: DataSourceContext) => Array<DataSourceOption>;
};
