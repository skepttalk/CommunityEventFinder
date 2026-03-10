import api from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "participant" | "organizer";
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const verifyOTP = async (data: { email: string; code: string }) => {
  const response = await api.post("/auth/verify-email", data);
  return response.data;
};


export const resendOTP = async (email: string) => {
  const response = await api.post("/auth/resend-otp", { email });
  return response.data;
};


export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};


export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
}) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};