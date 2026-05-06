import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { loginUserService } from "./auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.validatedData);

  return sendResponse({
    res,
    message: "Login successful",
    data: result
  });
});

export const getMe = asyncHandler(async (req, res) => {
  return sendResponse({
    res,
    message: "User fetched successfully",
    data: req.user
  });
});