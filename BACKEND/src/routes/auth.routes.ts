import express from "express";
import {
  register,
  login,
  verifyEmail,
  getMe,
  resendOTP,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../dto/auth.dto";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", verifyEmail);
router.post("/login", validate(loginSchema), login);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/me", protect, getMe);

export default router;
