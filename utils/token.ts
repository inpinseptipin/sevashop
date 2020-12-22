const VENDURE_TOKEN = "vendure-token";
export const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem(VENDURE_TOKEN);
  else return "yti4eygxragh59ndrgz";
};
export const setToken = (token) => localStorage.setItem(VENDURE_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(VENDURE_TOKEN);
