import http from "./httpService";
import { productUrl } from "../config.json";

const apiEndpoint = productUrl + "/products";

export function getProducts() {
  return http.get(apiEndpoint);
}
export function getProduct(productid) {
  return http.get(`productUrl\product\${productid}`);
}

export function saveProduct(product) {
  return http.post(productUrl + "/product", product);
}
