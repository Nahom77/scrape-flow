import { Workflow } from "@/generated/prisma/client";

interface Props {
  workflow: Workflow;
}

function FlowEditor({ workflow }: Props) {
  return <div>FlowEditor</div>;
}

export default FlowEditor;
