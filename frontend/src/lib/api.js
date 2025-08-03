import { exiosInstance } from "./axios";

export const signUp = async (signupData) => {
  const response = await exiosInstance.post("/auth/signUp", signupData);
  return response;
};
