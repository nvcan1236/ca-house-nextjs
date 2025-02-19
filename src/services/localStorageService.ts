const tokenKey = "TOKEN_KEY"

export const setToken = (token: string) => {
  if (typeof window !== "undefined")
  if (token) localStorage.setItem(tokenKey, token)
}

export const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem(tokenKey)
}

export const removeToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem(tokenKey)
}
