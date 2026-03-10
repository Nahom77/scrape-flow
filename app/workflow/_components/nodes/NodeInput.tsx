import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/tast.type";
import { Handle, Position } from "@xyflow/react";
import React from "react";

function NodeInput({ input }: { input: TaskParam }) {
  return (
    <div className="w-full p-3 flex justify-start relative bg-muted">
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "w-4! h-4! -left-2! bg-muted-foreground/60! border-2! border-background!",
          )}
        />
      )}
    </div>
  );
}

export default NodeInput;
