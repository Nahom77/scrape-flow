"use client";

import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { PlayIcon } from "lucide-react";
import React from "react";

function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        const plan = generate();
        console.log("---Plan---");
        console.table(plan);
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute{" "}
    </Button>
  );
}

export default ExecuteBtn;
