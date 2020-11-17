export type MeshSummaryType = 'graph' | 'node' | 'edge' | 'group';

export type MeshSummaryData = {
  summaryType: MeshSummaryType;
  summaryTarget: any;
};

export type MeshSummaryPanelPropType = {
  data: MeshSummaryData;
};

export enum MeshEdgeLabelMode {
  NONE = 'noEdgeLabels'
}

export enum MeshBoxType {
  CLUSTER = 'cluster',
  MESH = 'mesh',
  NAMESPACE = 'namespace',
  NETWORK = 'network'
}

export enum MeshNodeType {
  CONTROL_PLANE = 'cp',
  DATA_PLANE = 'dp',
  KIALI = 'kiali',
  SERVICE = 'service'
}

export type MeshNodeParamsType = {
  nodeType: MeshNodeType;
};

// This data is stored in the _global scratch area in the cy graph
// for use by code that needs access to it.
// We can add more props to this scratch data as the need arises.
export const MeshCyGlobalScratchNamespace = '_meshglobal';
export type MeshCyGlobalScratchData = {
  edgeLabelMode: MeshEdgeLabelMode;
};

export interface MeshCyBaseEvent {
  summaryType: MeshSummaryType; // what the summary panel should show
  summaryTarget: any; // the cytoscape element that was the target of the event
}

export interface MeshCyClickEvent extends MeshCyBaseEvent {}
export interface MeshCyMouseInEvent extends MeshCyBaseEvent {}
export interface MeshCyMouseOutEvent extends MeshCyBaseEvent {}

// Node data expected from server
export type MeshGraphNodeData = {
  id: string;
  parent?: string;
  nodeType: MeshNodeType;
};

// Edge data expected from server
export type MeshGraphEdgeData = {
  id: string;
  source: string;
  target: string;
};

export type MeshGraphNodeWrapper = {
  data: MeshGraphNodeData;
};

export type MeshGraphEdgeWrapper = {
  data: MeshGraphEdgeData;
};

export type MeshGraphElements = {
  nodes?: MeshGraphNodeWrapper[];
  edges?: MeshGraphEdgeWrapper[];
};

export type GraphDefinition = {
  elements: MeshGraphElements;
  timestamp: number;
};

// Node data after decorating at fetch-time (what is mainly used by ui code)
export interface DecoratedMeshGraphNodeData extends MeshGraphNodeData {}

// Edge data after decorating at fetch-time (what is mainly used by ui code)
export interface DecoratedMeshGraphEdgeData extends MeshGraphEdgeData {}

export interface DecoratedMeshGraphNodeWrapper {
  data: DecoratedMeshGraphNodeData;
}

export interface DecoratedMeshGraphEdgeWrapper {
  data: DecoratedMeshGraphEdgeData;
}

export interface DecoratedMeshGraphElements {
  nodes?: DecoratedMeshGraphNodeWrapper[];
  edges?: DecoratedMeshGraphEdgeWrapper[];
}
