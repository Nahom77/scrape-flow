"use client";

import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";

function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
        // className="z-200"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            zIndex: 200,
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className="size-5 hover:shadow-lg border rounded-full text-xs leading-none cursor-pointer"
            onClick={() =>
              setEdges((eds) => eds.filter((ed) => ed.id !== props.id))
            }
          >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default DeletableEdge;
