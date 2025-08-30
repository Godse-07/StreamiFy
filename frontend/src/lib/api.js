import { axiosInstance } from "./axios";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signUp", signupData);
  return response;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me")
  return res.data
}