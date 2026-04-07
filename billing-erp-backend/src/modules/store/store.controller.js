import { asyncHandler } from "../../utils/asyncHandler.js";
import { createStoreService } from "./store.service.js";

export const createStore = asyncHandler(async (req, res) => {
  const store = await createStoreService(req.body);

  res.status(201).json({
    success: true,
    message: "Store created successfully",
    data: store
  });
});