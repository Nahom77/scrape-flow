"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  CreateWorkflowValues,
} from "@/schema/workflows.schema";
import { WorkflowStatus } from "@/types/workflow.type";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: CreateWorkflowValues) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }

  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("Unauthenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      userId: session?.user.id,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to creat workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
