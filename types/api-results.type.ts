import { Prisma } from "@/generated/prisma/client";

export type APIResults<T> =
  | { success: true; data: T }
  | { success: false; error: Prisma.PrismaClientKnownRequestError | string };
