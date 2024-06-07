import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 5000,
  maxBodyLength: Infinity,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
