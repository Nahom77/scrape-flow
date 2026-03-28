import { Workflow } from "@/generated/prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/components/context/FlowValidationContext";

interface Props {
  workflow: Workflow;
}

function Editor({ workflow }: Props) {
  return (
    <div className="w-full h-full">
      <FlowValidationContextProvider>
        <ReactFlowProvider>
          <div className="w-full h-full overflow-hidden flex flex-col">
            <Topbar
              title="Workflow Editor"
              subtitle={workflow.name}
              workflowId={workflow.id}
            />
            <section className="h-full overflow-auto flex">
              <TaskMenu />
              <FlowEditor workflow={workflow} />
            </section>
          </div>
        </ReactFlowProvider>
      </FlowValidationContextProvider>
    </div>
  );
}

export default Editor;
