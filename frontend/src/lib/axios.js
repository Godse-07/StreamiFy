import axios from "axios";

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true 
})