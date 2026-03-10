import React, { ReactNode } from "react";

function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
}

export default NodeInputs;
