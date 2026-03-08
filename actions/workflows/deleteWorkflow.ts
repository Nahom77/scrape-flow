"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteWorkflow = async (id: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { success: false, error: "Unauthenticated" };
    }

    await prisma.workflow.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    revalidatePath("/workflows");
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};
