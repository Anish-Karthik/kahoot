import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api`,
  timeout: 30000,
  maxBodyLength: Infinity,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
