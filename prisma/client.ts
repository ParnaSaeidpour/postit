import { PrismaClient } from "@prisma/client"

// Reuse one client during development, so hot reload does not open new database connections
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
