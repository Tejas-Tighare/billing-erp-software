import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// 🔥 ADD THIS CHECK
if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
  adapter
});

export default prisma;