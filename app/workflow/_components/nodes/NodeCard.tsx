"use client";

import { ReactNode } from "react";

function NodeCard({
  nodeId,
  children,
}: {
  children: ReactNode;
  nodeId: string;
}) {
  return <div>{children}</div>;
}

export default NodeCard;
