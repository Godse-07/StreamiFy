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
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data.friends;
}

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.recommendedUsers || [];
}

export const getOutgoingFriendRequests = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data.outgoingRequests;
}

export const sendFriendRequests = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data.friendRequest;
}

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data.friendRequest;
}

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}