const tokenKey = "TOKEN_KEY";

export const setToken = (token: string) => {
  // if (!token) removeToken();
  token && localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};
