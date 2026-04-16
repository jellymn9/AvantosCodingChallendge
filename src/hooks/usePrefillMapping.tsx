import { useState } from "react";
import type { MappingState, MappingValue } from "../types/mapping";

export function usePrefillMapping() {
  const [mapping, setMapping] = useState<MappingState>({});

  function setFieldMapping(formId: string, field: string, value: MappingValue) {
    setMapping((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [field]: value,
      },
    }));
  }

  function clearFieldMapping(formId: string, field: string) {
    setMapping((prev) => {
      const formMapping = { ...prev[formId] };
      delete formMapping[field];

      return {
        ...prev,
        [formId]: formMapping,
      };
    });
  }

  return { mapping, setFieldMapping, clearFieldMapping };
}
