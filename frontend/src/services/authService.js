import jwtDecode from "jwt-decode";
import http from "./httpService";
import { userUrl } from "../config.json";

const apiEndpoint = userUrl + "/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  loginWithJwt(response.headers["x-auth-token"]);
  console.log("login", response);
  //localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log(jwt);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
