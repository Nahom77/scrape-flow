"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/app-node.type";
import { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className="w-full p-1 space-y-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className="text-destructive">*</p>}
      </Label>
      <Input
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(internalValue)}
        placeholder="Enter value here"
        className="bg-white text-xs"
      />
      {param.helperText && (
        <p className="px-2 text-muted-foreground/70">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
