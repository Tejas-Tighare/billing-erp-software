
import prisma from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUserService = async (data) => {
  const { name, email, password, storeId } = data;

  // validation
  if (!name || !email || !password || !storeId) {
    throw new Error("All fields are required");
  }

  // check store exists (VERY IMPORTANT)
  const store = await prisma.store.findUnique({
    where: { id: storeId }
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // check duplicate user
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      storeId
    }
  });

  // ❌ remove password before returning
  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  // validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // generate token
  const token = generateToken({
    userId: user.id,
    storeId: user.storeId
  });

  // ❌ remove password
  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    token
  };
};