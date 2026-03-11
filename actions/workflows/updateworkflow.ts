"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow.type";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      throw new Error("Unauthenticated");
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found");
    }
    if (workflow.status !== WorkflowStatus.DRAFT) {
      throw new Error("Workflow is not a draft");
    }

    await prisma.workflow.update({
      data: {
        definition,
      },
      where: {
        id,
        userId: session.user.id,
      },
    });

    revalidatePath("/workflows");
  } catch {
    throw Error("Something went wrong, please try again.");
  }
}
