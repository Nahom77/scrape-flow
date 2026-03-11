"use server";

import { Prisma } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowSchema,
  CreateWorkflowValues,
} from "@/schema/workflows.schema";
import { APIResults } from "@/types/api-results.type";
import { AppNode } from "@/types/app-node.type";
import { TaskType } from "@/types/tast.type";
import { Workflow, WorkflowStatus } from "@/types/workflow.type";
import { Edge } from "@xyflow/react";

export async function CreateWorkflow(
  form: CreateWorkflowValues,
): Promise<APIResults<Workflow>> {
  try {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) {
      throw new Error("Invalid form data");
    }

    const session = await getServerSession();
    if (!session?.user) {
      throw new Error("Unauthenticated");
    }

    const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

    const result = await prisma.workflow.create({
      data: {
        userId: session?.user.id,
        status: WorkflowStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data,
      },
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Workflow with this name already exists");
      }
    }
  }

  throw new Error("Something went wrong. Please try again.");
}
