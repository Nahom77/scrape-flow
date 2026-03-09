import { GetSingleWorkflow } from "@/actions/workflows/getWorkflowsForUser";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflow = await GetSingleWorkflow(id);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <div>{workflow?.name} hello</div>;
}

export default page;
