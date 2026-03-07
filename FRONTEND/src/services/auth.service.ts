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
