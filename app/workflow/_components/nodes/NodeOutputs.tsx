import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/tast.type";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";

function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1 divide-y">{children}</div>;
}

export default NodeOutputs;

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="p-3 flex justify-end relative bg-muted">
      <p className="text-muted-foreground text-xs">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "size-4! -right-2! bg-muted-foreground! border-2! border-background!",
        )}
      />
    </div>
  );
}
