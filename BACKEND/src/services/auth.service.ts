import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { BadRequest } from "../errorHandler/httpError";
import { env } from "../config/env";
import { sendEmail } from "./mail.service";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    env.JWT_SECRET as jwt.Secret,
    { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions,
  );
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  email = email.toLowerCase();

  const userExists = await User.findOne({ email }).lean();

  if (userExists) {
    throw new BadRequest("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    verificationCode,
    verificationCodeExpire: new Date(Date.now() + 10 * 60 * 1000),
  });

  sendEmail({
    to: email,
    subject: "Verify your email",
    text: `Your verification code is: ${verificationCode}`,
  }).catch((err) => {
    console.error("Email sending failed:", err);
  });

  return {
    message: "Verification code sent to your email",
    email,
  };
};

export const verifyEmailService = async (email: string, code: string) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Invalid email");
  }

  if (user.isVerified) {
    throw new BadRequest("Email already verified");
  }

  if (user.verificationCode !== code) {
    throw new BadRequest("Invalid verification code");
  }

  if (
    !user.verificationCodeExpire ||
    user.verificationCodeExpire < new Date()
  ) {
    throw new BadRequest("Verification code expired");
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;

  await user.save();

  const token = generateToken(user._id.toString());

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email }).lean();

  if (!user) {
    throw new BadRequest("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new BadRequest("Please verify your email first");
  }

  const token = generateToken(user._id.toString());

  return { token, user };
};

export const resendVerificationCode = async (email: string) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("User not found");
  }

  if (user.isVerified) {
    throw new BadRequest("Email already verified");
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  user.verificationCode = verificationCode;
  user.verificationCodeExpire = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  await sendEmail({
    to: email,
    subject: "Resend OTP - Verify your email",
    text: `Your new verification code is: ${verificationCode}`,
  });

  return { message: "New verification code sent" };
};

export const forgotPasswordService = async (email: string) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("User not found");
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetPasswordCode = code;
  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  await sendEmail({
    to: email,
    subject: "Reset your password",
    text: `Your password reset code is: ${code}`,
  });

  return { message: "Password reset code sent" };
};

export const resetPasswordService = async (
  email: string,
  code: string,
  newPassword: string,
) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("User not found");
  }

  if (user.resetPasswordCode !== code) {
    throw new BadRequest("Invalid reset code");
  }

  if (!user.resetPasswordExpire || user.resetPasswordExpire < new Date()) {
    throw new BadRequest("Reset code expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return { message: "Password reset successfully" };
};
