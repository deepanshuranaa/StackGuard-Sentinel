'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  type NodeTypes,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Maximize, Minimize } from 'lucide-react';

import { IdentityNode } from './identity-node';
import { ServiceNode } from './service-node';
import { ScopeNode } from './scope-node';

const nodeTypes: NodeTypes = {
  identityNode: IdentityNode,
  serviceNode: ServiceNode,
  scopeNode: ScopeNode,
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
      <Controls showInteractive={false} showFitView />
    </ReactFlow>
  );
}

export function BlastRadiusGraph({ nodes, edges }: BlastRadiusGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Sync state if user exits fullscreen with Escape
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-xl border bg-slate-50 dark:bg-slate-950 ${
        isFullscreen ? 'h-screen' : 'h-[520px]'
      }`}
    >
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? (
          <Minimize className="h-4 w-4 text-foreground" />
        ) : (
          <Maximize className="h-4 w-4 text-foreground" />
        )}
      </button>
      <ReactFlowProvider>
        <FlowInner nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
