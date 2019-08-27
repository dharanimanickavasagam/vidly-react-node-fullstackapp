import http from "../httpAxiosModule/httpAxiosService";
import jwtDecode from "jwt-decode";

export async function authenticateUser(user) {
  const { data: jwt } = await http.post("/auth", user);
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function logoutUser() {
  localStorage.removeItem("token");
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function getJwtToken() {
  return localStorage.getItem("token");
}
