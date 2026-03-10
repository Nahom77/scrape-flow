"use client";

import { TaskParam, TaskParamType } from "@/types/tast.type";
import StringParam from "./param/StringParam";

function NodeParamField({ param }: { param: TaskParam }) {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-muted-foreground text-xs">Not Implemented</p>
        </div>
      );
  }
}

export default NodeParamField;
