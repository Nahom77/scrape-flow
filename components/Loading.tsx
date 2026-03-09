import { Loader2Icon } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader2Icon size={30} className="stroke-primary animate-spin" />
    </div>
  );
}

export default Loading;
