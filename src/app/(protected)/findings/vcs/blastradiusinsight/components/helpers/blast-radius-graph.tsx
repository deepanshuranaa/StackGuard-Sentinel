'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type NodeTypes,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { IdentityNode } from './identity-node';
import { ServiceNode } from './service-node';
import { ScopeNode } from './scope-node';

const nodeTypes: NodeTypes = {
  identityNode: IdentityNode,
  serviceNode: ServiceNode,
  scopeNode: ScopeNode,
};

const miniMapNodeColor = (node: Node): string => {
  switch (node.type) {
    case 'identityNode': return '#1e293b';
    case 'serviceNode': return '#f97316';
    case 'scopeNode': return '#eab308';
    default: return '#6b7280';
  }
};

interface BlastRadiusGraphProps {
  nodes: Node[];
  edges: Edge[];
}

function FlowInner({ nodes, edges }: BlastRadiusGraphProps) {
  const { fitView } = useReactFlow();

  const onInit = useCallback(() => {
    setTimeout(() => fitView({ padding: 0.15 }), 50);
  }, [fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={onInit}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.1}
      maxZoom={2}
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={20} size={1} />
      <Controls showInteractive={false} />
      <MiniMap
        nodeStrokeWidth={3}
        nodeColor={miniMapNodeColor}
        className="!bg-slate-100 dark:!bg-slate-900 !rounded-lg !border"
      />
    </ReactFlow>
  );
}

export function BlastRadiusGraph({ nodes, edges }: BlastRadiusGraphProps) {
  return (
    <div className="h-[520px] w-full rounded-xl border bg-slate-50 dark:bg-slate-950">
      <ReactFlowProvider>
        <FlowInner nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
