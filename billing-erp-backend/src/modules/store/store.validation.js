import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().optional(),

  ownerName: z.string().min(2),
  ownerEmail: z.string().email(),
  ownerPassword: z.string().min(6),

  panNumber: z.string().optional(),
  gstNumber: z.string().optional()
});

export const updateStoreSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional()
});

export const updateLegalSchema = z.object({
  panNumber: z.string().optional(),
  gstNumber: z.string().optional()
});