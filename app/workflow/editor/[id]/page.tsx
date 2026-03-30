import { GetSingleWorkflow } from "@/actions/workflows/getWorkflowsForUser";
import Editor from "../../_components/Editor";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const param = await params;
  const workflow = await GetSingleWorkflow(param.id);

  return {
    title: `Edit - ${workflow?.name.toUpperCase() ?? ""}`,
    description: "Edit Workflow",
  };
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflow = await GetSingleWorkflow(id);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default page;
