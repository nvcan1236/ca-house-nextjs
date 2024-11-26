import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { ApiResponse } from "@/lib/types";
import { caHouseBaseUrl } from "@/configs/api-config";
import {
  getToken,
  removeToken,
  setToken,
} from "@/services/localStorageService";

const baseQuery = fetchBaseQuery({
  baseUrl: caHouseBaseUrl,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const noHeaderBaseQuery = fetchBaseQuery({
  baseUrl: caHouseBaseUrl,
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getToken();
    const refreshResult = await noHeaderBaseQuery(
      {
        url: "/identity/auth/refresh",
        method: "POST",
        body: { token: refreshToken },
      },
      api,
      extraOptions
    );

    const resultData = refreshResult.data as ApiResponse<{ token: string }>;

    if (resultData.result.token) {
      setToken(resultData.result.token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      removeToken();
      // Nếu refresh token thất bại, logout người dùng hoặc điều hướng đến trang login
      // api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
