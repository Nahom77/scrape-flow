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
        {param.required && <p className="text-destructive">*</p>}
      </Label>
      <Input id={id} className="bg-white" />
      {param.helperText && (
        <p className="px-2 text-muted-foreground/70">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
