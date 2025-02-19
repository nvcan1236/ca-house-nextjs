import { caHouseBaseUrl } from "@/configs/api-config";
import { getToken } from "@/services/localStorageService";
import axios from "axios";

export default axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export const formDataAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getToken()}`,
  },
});
