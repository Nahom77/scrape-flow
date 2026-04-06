"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("Unauthenticated");
  }

  return prisma.worfklowExecution.findUnique({
    where: {
      id: executionId,
      userId: session.user.id,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
