import React, { Suspense } from "react";
import Topbar from "../../_components/topbar/Topbar";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { InboxIcon, Loader2Icon } from "lucide-react";
import ExecutionsTable from "./[executionId]/_components/ExecutionsTable";

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

      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Loader2Icon size={30} className="stroke-primary animate-spin" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
}

export default ExecutionsPage;

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <div>No Data</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="w-full py-6 container">
        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
          <div className="size-20 flex items-center bg-accent rounded-full">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this Workflow
            </p>
            <p className="text-muted-foreground text-sm">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ExecutionsTable workflowId={workflowId} initialData={executions} />;
}
