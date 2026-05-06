import prisma from "../../config/prisma.js";
import { hashPassword } from "../../utils/hash.js";


// 🔥 CREATE STORE + OWNER + LEGAL (TRANSACTION - FIXED)
export const createStoreService = async (data) => {
  const {
    name,
    email,
    phone,
    address,
    ownerName,
    ownerEmail,
    ownerPassword,
    panNumber,
    gstNumber
  } = data;

  // 🔥 Wake up DB (important for cloud DB like Neon)
  await prisma.$queryRaw`SELECT 1`;

  return await prisma.$transaction(
    async (tx) => {

      // 1. Check store email
      const existingStore = await tx.store.findUnique({
        where: { email }
      });

      if (existingStore) {
        throw new Error("Store already exists with this email");
      }

      // 2. Check owner email
      const existingUser = await tx.user.findFirst({
        where: { email: ownerEmail }
      });

      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // 3. Create Store
      const store = await tx.store.create({
        data: {
          name,
          email,
          phone,
          address
        }
      });

      // 4. Create Legal (optional)
      if (panNumber || gstNumber) {
        await tx.storeLegal.create({
          data: {
            storeId: store.id,
            ownerName,
            panNumber: panNumber || "",
            gstNumber: gstNumber || null,
            verified: false
          }
        });
      }

      // 5. Hash password
      const hashedPassword = await hashPassword(ownerPassword);

      // 6. Create Owner
      const owner = await tx.user.create({
        data: {
          name: ownerName,
          email: ownerEmail,
          password: hashedPassword,
          role: "OWNER",
          storeId: store.id
        }
      });

      return {
        store,
        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email,
          role: owner.role
        }
      };
    },
    {
      maxWait: 10000, // wait for connection
      timeout: 15000  // execution time
    }
  );
};


// 🔹 GET ALL STORES
export const getStoresService = async () => {
  return await prisma.store.findMany({
    include: {
      legal: true,
      users: {
        where: { role: "OWNER" },
        select: { id: true, name: true, email: true }
      }
    }
  });
};


// 🔹 GET SINGLE STORE
export const getStoreByIdService = async (id) => {
  return await prisma.store.findUnique({
    where: { id },
    include: {
      legal: true,
      users: true
    }
  });
};


// 🔹 UPDATE STORE
export const updateStoreService = async (id, data) => {
  const store = await prisma.store.findUnique({
    where: { id }
  });

  if (!store) return null;

  return await prisma.store.update({
    where: { id },
    data
  });
};


// 🔹 TOGGLE STORE STATUS
export const toggleStoreStatusService = async (id) => {
  const store = await prisma.store.findUnique({
    where: { id }
  });

  if (!store) return null;

  return await prisma.store.update({
    where: { id },
    data: {
      isActive: !store.isActive
    }
  });
};


// 🔹 UPDATE LEGAL
export const updateStoreLegalService = async (id, data) => {
  const store = await prisma.store.findUnique({
    where: { id }
  });

  if (!store) return null;

  const existing = await prisma.storeLegal.findUnique({
    where: { storeId: id }
  });

  if (existing) {
    return await prisma.storeLegal.update({
      where: { storeId: id },
      data
    });
  }

  return await prisma.storeLegal.create({
    data: {
      storeId: id,
      ownerName: "N/A",
      ...data
    }
  });
};