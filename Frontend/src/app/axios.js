import axios from "axios";
import { BaseURL } from "../env";

export const http_client = axios.create({
  baseURL: BaseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

console.log(`Connected to Backend : ${BaseURL}`);
