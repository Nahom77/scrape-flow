import React from "react";
import Topbar from "../../_components/topbar/Topbar";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";

async function ExecutionsPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const workflowId = (await params).workflowId;
  return (
    <div className="w-full h-full overflow-auto">
      <Topbar
        workflowId={workflowId}
        title="All runs"
        subtitle="List of all your workflow runs"
        hideButtons
      />
      <ExecutionsTable workflowId={workflowId} />
    </div>
  );
}

export default ExecutionsPage;

async function ExecutionsTable({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <div>No Data</div>;
  }
}
