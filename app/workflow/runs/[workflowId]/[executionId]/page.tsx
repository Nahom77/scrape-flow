import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

async function ExecutionViewerPage({
  params,
}: {
  params: Promise<{ workflowId: string; executionId: string }>;
}) {
  const param = await params;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <Topbar
        workflowId={param.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${param.executionId}`}
        hideButtons
      />
      <section className="h-full overflow-auto flex">
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center">
              <Loader2Icon className="size-10 stroke-primary animate-spin" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={param.executionId} />
        </Suspense>
      </section>
    </div>
  );
}

export default ExecutionViewerPage;

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution} />;
}
