import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// @ts-expect-error - to by pass the any issue
prisma.$use(async (params, next) => {
  const result = await next(params);
  if (params.model === "User" && params.action === "create") {
    // create balance row; credits has default 1000 in schema
    await prisma.userBalance
      .create({ data: { userId: result.id } })
      .catch(() => {});
  }
  return result;
});

export default prisma;
