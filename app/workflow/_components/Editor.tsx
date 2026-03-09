import { Workflow } from "@/generated/prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";

interface Props {
  workflow: Workflow;
}

function Editor({ workflow }: Props) {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <div className="w-full h-full overflow-hidden flex flex-col">
          <section className="h-full overflow-auto flex">
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default Editor;
