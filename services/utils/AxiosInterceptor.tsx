import axios from "axios";
import { router } from "expo-router";

const VITE_SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL

let BaseURL = "/api/v1/"
if (VITE_SERVER_URL)
  BaseURL = VITE_SERVER_URL + BaseURL

const apiClient = axios.create({
  baseURL: BaseURL,
  withCredentials: true
})

apiClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.data.message === "please login to access this resource" || error.response.data.message === "login again ! session expired" || error.response.data.message === "login again") {
    router.replace("/login")
  }
  return Promise.reject(error);
});

export {
  BaseURL,
  apiClient
}