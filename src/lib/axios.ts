import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach an auth token if one is stored client-side. Swap this for your
// real auth strategy (cookies, next-auth session, etc.) when ready.
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);

export const apiClient = {
  get: <T>(path: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(path, config).then((res) => res.data),
  post: <T>(path: string, body: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(path, body, config).then((res) => res.data),
  put: <T>(path: string, body: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(path, body, config).then((res) => res.data),
  delete: <T>(path: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(path, config).then((res) => res.data),
};
