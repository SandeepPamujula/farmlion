import http from "./httpService";
import { productUrl } from "../config.json";

const apiEndpoint = productUrl + "/products";

export function getProducts() {
  return http.get(apiEndpoint);
}
