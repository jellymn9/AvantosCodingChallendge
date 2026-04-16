export type MappingValue = {
  type: "form_field" | "global";
  sourceFormId?: string;
  sourceField?: string;
};

export type FormMapping = Record<string, MappingValue>;

export type MappingState = Record<string, FormMapping>;
