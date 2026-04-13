import api from "./api";
export const regUser = (user) => {
  return api.post("users/register", user);
};
export const authUser = (user) => {
  return api.post("auth/login", user);
};
