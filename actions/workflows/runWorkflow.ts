"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { WorkflowExecutionPlan } from "@/types/workflow.type";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("Workflow Id is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId: session.user.id,
      id: workflowId,
    },
  });
  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("flow definition is not defined");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("Execution plan not generated");
  }

  executionPlan = result.executionPlan;

  console.log(executionPlan);
}
