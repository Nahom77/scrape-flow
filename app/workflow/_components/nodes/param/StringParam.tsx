"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/app-node.type";
import { useEffect, useId, useState } from "react";

function StringParam({
  param,
  value,
  disabled,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const Component: any = param.variant === "textarea" ? Textarea : Input;

  return (
    <div className="w-full p-1 space-y-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className="text-destructive">*</p>}
      </Label>
      <Component
        id={id}
        value={internalValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInternalValue(e.target.value)
        }
        onBlur={() => updateNodeParamValue(internalValue)}
        placeholder="Enter value here"
        className="bg-white text-xs"
        disabled={disabled}
      />
      {param.helperText && (
        <p className="px-2 text-muted-foreground/70">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
