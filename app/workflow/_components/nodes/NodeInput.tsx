import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/tast.type";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";

function NodeInput({ input, nodeId }: { input: TaskParam; nodeId: string }) {
  const edges = useEdges();
  console.log(edges);
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );

  return (
    <div className="w-full p-3 flex justify-start relative bg-muted">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "w-4! h-4! -left-2! bg-muted-foreground/60! border-2! border-background!",
            ColorForHandle[input.type],
          )}
        />
      )}
    </div>
  );
}

export default NodeInput;
