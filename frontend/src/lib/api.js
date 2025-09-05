import { axiosInstance } from "./axios";

export const signUp = async (signupData) => {
  const response = await axiosInstance.post("/auth/signUp", signupData);
  return response;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response;
}

export const getAuthUser = async () => {
  try{
    const res = await axiosInstance.get("/auth/me")
    return res.data
  }catch(err){
    console.log(err);
    return null;
  }
}

export const completeOnboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onboardingData);
  return response.data;
}

export const logout = async () => {
  console.log("Logging out user...");
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}