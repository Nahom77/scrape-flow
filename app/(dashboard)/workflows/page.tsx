import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="h-full flex flex-col flex-1">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
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
    <div>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-full h-32" />
      ))}
    </div>
  );
}

function UserWorkflows() {
  return <div className=""></div>;
}

export default page;
