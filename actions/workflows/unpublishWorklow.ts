"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow.type";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow(id: string) {
  const session = await getServerSession();
  if (!session?.user.id) {
    throw new Error("Unauthenticated");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
