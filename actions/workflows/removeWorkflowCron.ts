"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function RemoveWorkflowCron(id: string) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath("/workflows");
}
