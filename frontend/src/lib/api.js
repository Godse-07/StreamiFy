import { axiosInstance } from "./axios";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signUp", signupData);
  return response;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me")
  return res.data
}

export const completeOnboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onboardingData);
  return response.data;
}