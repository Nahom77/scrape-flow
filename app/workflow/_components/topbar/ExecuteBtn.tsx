"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

function ExecuteBtn({ workflowId }: { workflowId: string }) {
  return (
    <Button variant={"outline"}>
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute{" "}
    </Button>
  );
}

export default ExecuteBtn;
