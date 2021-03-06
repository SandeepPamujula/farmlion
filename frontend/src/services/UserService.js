import http from "./httpService";
import { userUrl } from "../config.json";

const apiEndpoint = userUrl + "/signup";

export function register(user) {
  console.log("register", user);
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    isAdmin: user.isAdmin,
  });
}
