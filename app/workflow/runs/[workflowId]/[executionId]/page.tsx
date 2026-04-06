import React from "react";

async function ExecutionViewerPage({
  params,
}: {
  params: Promise<{ workflowId: string; executionId: string }>;
}) {
  const param = await params;

  return <div></div>;
}

export default ExecutionViewerPage;
