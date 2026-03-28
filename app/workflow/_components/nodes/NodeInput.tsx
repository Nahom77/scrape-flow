import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/tast.type";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/hooks/useFlowValidation";

function NodeInput({ input, nodeId }: { input: TaskParam; nodeId: string }) {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.includes(input.name);

  return (
    <div
      className={cn(
        "w-full p-3 flex justify-start relative bg-muted",
        hasErrors && "bg-destructive/30",
      )}
    >
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
