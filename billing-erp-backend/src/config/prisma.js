import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Debug check
console.log("DATABASE_URL Loaded:", !!process.env.DATABASE_URL);

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