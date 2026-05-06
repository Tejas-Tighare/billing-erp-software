import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/apiResponse.js";

import {
  createStoreService,
  getStoresService,
  getStoreByIdService,
  updateStoreService,
  toggleStoreStatusService,
  updateStoreLegalService
} from "./store.service.js";

// 🔥 CREATE STORE
export const createStore = asyncHandler(async (req, res) => {
  const result = await createStoreService(req.validatedData);

  return sendResponse({
    res,
    message: "Store created successfully",
    data: result
  });
});

// 🔹 GET ALL STORES
export const getStores = asyncHandler(async (req, res) => {
  const stores = await getStoresService();

  return sendResponse({
    res,
    message: "Stores fetched successfully",
    data: stores
  });
});

// 🔹 GET SINGLE STORE
export const getStoreById = asyncHandler(async (req, res) => {
  const store = await getStoreByIdService(req.params.id);

  if (!store) {
    throw new Error("Store not found");
  }

  return sendResponse({
    res,
    message: "Store fetched successfully",
    data: store
  });
});

// 🔹 UPDATE STORE
export const updateStore = asyncHandler(async (req, res) => {
  const store = await updateStoreService(req.params.id, req.validatedData);

  if (!store) {
    throw new Error("Store not found");
  }

  return sendResponse({
    res,
    message: "Store updated successfully",
    data: store
  });
});

// 🔹 TOGGLE STORE STATUS
export const toggleStoreStatus = asyncHandler(async (req, res) => {
  const store = await toggleStoreStatusService(req.params.id);

  if (!store) {
    throw new Error("Store not found");
  }

  return sendResponse({
    res,
    message: "Store status updated successfully",
    data: store
  });
});

// 🔹 UPDATE STORE LEGAL
export const updateStoreLegal = asyncHandler(async (req, res) => {
  const legal = await updateStoreLegalService(
    req.params.id,
    req.validatedData
  );

  if (!legal) {
    throw new Error("Store not found");
  }

  return sendResponse({
    res,
    message: "Store legal details updated successfully",
    data: legal
  });
});