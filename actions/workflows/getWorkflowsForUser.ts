"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function GetWorkflowsForUser() {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  return prisma.workflow.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function GetSingleWorkflow(workflowId: string) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  return prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: session.user.id,
    },
  });
}
