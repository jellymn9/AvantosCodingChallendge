export type ApiNode = {
  id: string;
  type: string;
  data: {
    name: string;
    component_id: string;
  };
};

export type ApiEdge = {
  source: string;
  target: string;
};

export type ApiForm = {
  id: string;
  field_schema: {
    properties?: Record<string, unknown>;
  };
};

export type ApiGraph = {
  nodes?: ApiNode[];
  edges?: ApiEdge[];
  forms?: ApiForm[];
};

export type Form = {
  id: string;
  name: string;
  fields: string[];
};

export type FormsById = Record<string, Form>;

export type Adjacency = Record<string, string[]>;

export type NormalizedGraph = {
  formsById: FormsById;
  reverseAdj: Adjacency;
  adjacency: Adjacency;
};

function extractFields(fieldSchema?: ApiForm["field_schema"]): Array<string> {
  if (!fieldSchema?.properties) return [];

  return Object.keys(fieldSchema.properties);
}

function buildFormsById(
  nodes: Array<ApiNode>,
  forms: Array<ApiForm>,
): FormsById {
  const formsMap: FormsById = {};

  // component_id -> form definition
  const formsByComponentId: Record<string, ApiForm> = {};
  for (const form of forms) {
    formsByComponentId[form.id] = form;
  }

  for (const node of nodes) {
    if (node.type !== "form") continue;

    const formId = node.id;
    const componentId = node.data.component_id;

    const formDefinition = formsByComponentId[componentId];
    if (!formDefinition) continue;

    formsMap[formId] = {
      id: formId,
      name: node.data.name,
      fields: extractFields(formDefinition.field_schema),
    };
  }

  return formsMap;
}

// target -> [sources]
function buildReverseAdj(
  nodes: Array<ApiNode>,
  edges: Array<ApiEdge>,
): Adjacency {
  const reverseAdj: Adjacency = {};

  for (const node of nodes) {
    reverseAdj[node.id] = [];
  }

  for (const edge of edges) {
    const { source, target } = edge;

    if (!reverseAdj[target]) {
      reverseAdj[target] = [];
    }

    reverseAdj[target].push(source);
  }

  return reverseAdj;
}

// source -> [targets]
function buildAdjacency(
  nodes: Array<ApiNode>,
  edges: Array<ApiEdge>,
): Adjacency {
  const adjacency: Adjacency = {};

  for (const node of nodes) {
    adjacency[node.id] = [];
  }

  for (const edge of edges) {
    const { source, target } = edge;

    if (!adjacency[source]) {
      adjacency[source] = [];
    }

    adjacency[source].push(target);
  }

  return adjacency;
}

export function normalizeGraph(
  data: ApiGraph | null | undefined,
): NormalizedGraph {
  if (!data) {
    return {
      formsById: {},
      reverseAdj: {},
      adjacency: {},
    };
  }

  const { nodes = [], edges = [], forms = [] } = data;

  const formsById = buildFormsById(nodes, forms);
  const reverseAdj = buildReverseAdj(nodes, edges);
  const adjacency = buildAdjacency(nodes, edges);

  return {
    formsById,
    reverseAdj,
    adjacency,
  };
}

export function getAncestors(
  nodeId: string,
  reverseAdj: Record<string, Array<string>>,
): Array<string> {
  const visited = new Set<string>();

  function dfs(current: string) {
    const parents = reverseAdj[current] || [];

    for (const parent of parents) {
      if (!visited.has(parent)) {
        visited.add(parent);
        dfs(parent);
      }
    }
  }

  dfs(nodeId);

  return Array.from(visited);
}
