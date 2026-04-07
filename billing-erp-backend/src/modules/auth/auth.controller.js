import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  registerUserService,
  loginUserService
} from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);

  res.json({
    success: true,
    message: "Login successful",
    data: result
  });
});