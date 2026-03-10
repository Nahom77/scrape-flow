"use client";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/tast.type";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  return (
    <div className="p-2 flex items-center gap-2">
      <task.icon size={16} />
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-muted-foreground text-xs uppercase">
          {task.label}
        </p>
        <div className="flex items-center gap-1">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="cursor-grap drag-handle"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
