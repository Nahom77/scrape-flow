"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

function NodeCard({
  nodeId,
  children,
  isSelected,
}: {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
}) {
  const { getNode, setCenter } = useReactFlow();

  const centerTheNode = (nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;

    const { measured, position } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };

  return (
    <div
      onDoubleClick={() => centerTheNode(nodeId)}
      className={cn(
        "w-105 flex flex-col gap-1 bg-background border-2 rounded-md text-xs cursor-pointer border-separate",
        isSelected && "border-primary",
      )}
    >
      {children}
    </div>
  );
}

export default NodeCard;
