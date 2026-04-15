"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function GetWorkflowExecutions(workflowId: string) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  return await prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
