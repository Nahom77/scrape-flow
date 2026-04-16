"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { CronExpressionParser } from "cron-parser";

export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  try {
    const session = await getServerSession();
    if (session?.user) {
      throw new Error("unauthenticated");
    }

    const interval = CronExpressionParser.parse(cron, { tz: "utc" });

    return await prisma.workflow.update({
      where: {
        id,
        userId: session?.user.id,
      },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Invalid cron expression");
  }
}
