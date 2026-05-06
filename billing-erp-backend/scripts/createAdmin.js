import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import prisma from "../src/config/prisma.js";
import { hashPassword } from "../src/utils/hash.js";

const createAdmin = async () => {
  try {
    console.log("🚀 Creating Super Admin...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL); // debug

    const existing = await prisma.user.findFirst({
      where: { email: "tejastighare@gmail.com" }
    });

    if (existing) {
      console.log("⚠️ Super Admin already exists");
      return;
    }

    const hashedPassword = await hashPassword("admin123");

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "tejastighare@gmail.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        storeId: null
      }
    });

    console.log("✅ Super Admin Created Successfully");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();