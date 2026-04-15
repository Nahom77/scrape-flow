"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export async function GetAvailableCredits() {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const balance = await prisma.userBalance.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!balance) return -1;

  return balance.credits;
}
