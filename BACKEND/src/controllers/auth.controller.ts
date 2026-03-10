import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import {
  registerUser,
  loginUser,
  verifyEmailService,
  resendVerificationCode,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service";
import { Unauthorized } from "../errorHandler/httpError";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const data = await registerUser(name, email, password, role);

  return successResponse(res, "Registration successful", data, 201);
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const data = await verifyEmailService(email, code);

  return successResponse(res, "Email verified successfully", data);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  return successResponse(res, "Login successful", data);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  return successResponse(res, "User fetched successfully", req.user);
});

export const resendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const data = await resendVerificationCode(email);

  return successResponse(res, "OTP resent successfully", data);
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const data = await forgotPasswordService(email);

    return successResponse(res, "Reset code sent to email", data);
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, code, password } = req.body;

    const data = await resetPasswordService(email, code, password);

    return successResponse(res, "Password reset successful", data);
  },
);
