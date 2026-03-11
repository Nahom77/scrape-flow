import { Workflow } from "@/generated/prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";

interface Props {
  workflow: Workflow;
}

function Editor({ workflow }: Props) {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <div className="w-full h-full overflow-hidden flex flex-col">
          <Topbar
            title="Workflow Editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className="h-full overflow-auto flex">
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default Editor;
