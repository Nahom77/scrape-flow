import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";

function page() {
  return (
    <div className="h-full flex flex-col flex-1">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-full h-32" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  try {
    const workflows = await GetWorkflowsForUser();

    if (workflows?.length === 0)
      return (
        <div className="h-full flex flex-col justify-center items-center gap-4">
          <div className="w-20 h-20 flex justify-center items-center bg-accent rounded-full">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No Workflow created yet</p>
            <p className="text-muted-foreground text-sm">
              Click the button below to create your first workflow
            </p>
          </div>
          <CreateWorkflowDialog triggerText="Create your first workflow" />
        </div>
      );

    return <div className=""></div>;
  } catch {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }
}

export default page;
