import { ParamProps } from "@/types/app-node.type";
import React from "react";

function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}

export default BrowserInstanceParam;
