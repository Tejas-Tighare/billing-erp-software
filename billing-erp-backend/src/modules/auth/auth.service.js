import prisma from "../../config/prisma.js";
import { comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const loginUserService = async ({ email, password }) => {
  // 1. Find active user
  const user = await prisma.user.findFirst({
    where: {
      email,
      isActive: true
    }
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate token
  const token = generateToken({
    id: user.id,
    role: user.role,
    storeId: user.storeId || null
  });

  // 4. Return safe data
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      storeId: user.storeId
    }
  };
};