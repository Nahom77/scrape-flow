"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("Unauthenticated");
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      userId: session.user.id,
      // execution: {
      //   userId: session.user.id,
      // },
    },
    include: {
      logs: {
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });
}
