import { caHouseBaseUrl } from "@/configs/api-config";
import {
  getToken,
  removeToken,
  setToken,
} from "@/services/localStorageService";
import { ApiResponse } from "@/types/common";

// Hàm fetch với xử lý token & refresh token tự động
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = getToken();

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${caHouseBaseUrl}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    // Token hết hạn, thử refresh token
    const refreshResponse = await fetch(`${caHouseBaseUrl}/identity/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!refreshResponse.ok) {
      removeToken();
      throw new Error("Unauthorized, please login again");
    }

    const refreshData: ApiResponse<{ token: string }> = await refreshResponse.json();
    if (refreshData.result?.token) {
      setToken(refreshData.result.token);
      token = refreshData.result.token;

      // Thử gọi lại API sau khi refresh token thành công
      const retryResponse = await fetch(`${caHouseBaseUrl}${url}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      });

      return retryResponse.json();
    } else {
      removeToken();
      throw new Error("Session expired, please login again");
    }
  }

  return response.json();
};

export default fetchWithAuth;
