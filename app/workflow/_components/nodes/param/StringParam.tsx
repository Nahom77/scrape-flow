"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/tast.type";
import { useId } from "react";

interface ParamProps {
  param: TaskParam;
}

function StringParam({ param }: ParamProps) {
  const id = useId();
  return (
    <div className="w-full p-1 space-y-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
      </Label>
      <Input id={id} className="bg-white" />
    </div>
  );
}

export default StringParam;
