/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/configs/env-config"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { toast } from "sonner"

// const ENTITY_ERROR_STATUS = 422
// const AUTHENTICATION_ERROR_STATUS = 401

// type EntityErrorPayload = {
//   message: string;
//   errors: {
//     field: string;
//     message: string;
//   }[];
// };

// export class HttpError extends Error {
//   status: number;
//   payload: {
//     message: string;
//     [key: string]: any;
//   };
//   constructor({ status, payload }: { status: number; payload: any }) {
//     super('Http Error');
//     this.status = status;
//     this.payload = payload;
//   }
// }

// export class EntityError extends HttpError {
//   status: 422;
//   payload: EntityErrorPayload;
//   constructor({
//     status,
//     payload,
//   }: {
//     status: 422;
//     payload: EntityErrorPayload;
//   }) {
//     super({ status, payload });
//     this.status = status;
//     this.payload = payload;
//   }
// }

// let clientLogoutRequest: null | Promise<any> = null
export const isClient = () => typeof window !== "undefined"

// Tạo một instance của axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_BE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Thêm interceptors để xử lý request và response
axiosInstance.interceptors.request.use(
  (config) => {
    if (isClient()) {
      const sessionToken = localStorage.getItem("sessionToken")
      if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    // const { response } = error
    // if (!response) return Promise.reject(error)

    // const { status, data } = response
    // if (status === ENTITY_ERROR_STATUS) {
    //   throw new EntityError({
    //     status: ENTITY_ERROR_STATUS,
    //     payload: data,
    //   })
    // } else if (status === AUTHENTICATION_ERROR_STATUS) {
    //   if (isClient()) {
    //     if (!clientLogoutRequest) {
    //       clientLogoutRequest = axiosInstance.post("/api/auth/logout", {
    //         force: true,
    //       })
    //       try {
    //         await clientLogoutRequest
    //       } catch (logoutError) {
    //       } finally {
    //         localStorage.removeItem("sessionToken")
    //         localStorage.removeItem("sessionTokenExpiresAt")
    //         clientLogoutRequest = null
    //         location.href = "/login"
    //       }
    //     }
    //   } else {
    //     const sessionToken =
    //       error.config.headers.Authorization.split("Bearer ")[1]
    //     redirect(`/logout?sessionToken=${sessionToken}`)
    //   }
    // }
    // return Promise.reject(new HttpError({ status, payload: data }))

    toast.error(error)
  }
)

const http = {
  get<Response>(
    url: string,
    options?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<Response>> {
    return axiosInstance.get<Response>(url, options)
  },
  post<Response>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<Response>> {
    return axiosInstance.post<Response>(url, body, options)
  },
  put<Response>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<Response>> {
    return axiosInstance.put<Response>(url, body, options)
  },
  patch<Response>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<Response>> {
    return axiosInstance.patch<Response>(url, body, options)
  },
  delete<Response>(
    url: string,
    options?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<Response>> {
    return axiosInstance.delete<Response>(url, options)
  },
}

export default http
