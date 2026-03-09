import { GetSingleWorkflow } from "@/actions/workflows/getWorkflowsForUser";
import Editor from "../../_components/Editor";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflow = await GetSingleWorkflow(id);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default page;
