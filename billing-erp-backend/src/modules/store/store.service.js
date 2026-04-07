import prisma from "../../config/prisma.js";

export const createStoreService = async (data) => {
  const { name, ownerName, email, phone, address } = data;

  if (!name || !ownerName || !email || !phone) {
    throw new Error("All required fields must be provided");
  }

  // check duplicate store
  const existingStore = await prisma.store.findUnique({
    where: { email }
  });

  if (existingStore) {
    throw new Error("Store already exists");
  }

  // create store
  const store = await prisma.store.create({
    data: {
      name,
      ownerName,
      email,
      phone,
      address
    }
  });

  return store;
};