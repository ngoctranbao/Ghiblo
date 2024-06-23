import axios from "../../config/axios";

export const loginService = (data) => {
  return axios.post("/auth/login/", data);
};

export const logoutService = () => {
  return axios.get("/auth/logout");
};

export const signupService = (data) => {
  return axios.post("/auth/signup", data);
};