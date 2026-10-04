import axios from "axios";
import { BACKEND_API_URL } from "@/lib/runtime-config";

export const api = axios.create({
  baseURL: `${BACKEND_API_URL}/`,
  timeout: 20_000,
  headers: {
    Accept: "application/json",
  },
});

