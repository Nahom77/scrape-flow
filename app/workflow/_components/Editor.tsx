import { Workflow } from "@/generated/prisma/client";
import React from "react";

interface Props {
  workflow: Workflow;
}

function Editor({ workflow }: Props) {
  return <div>Editor</div>;
}

export default Editor;
