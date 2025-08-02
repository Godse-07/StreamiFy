import axios from "axios";

export const exiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true 
})