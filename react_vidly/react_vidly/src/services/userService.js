import http from "../httpAxiosModule/httpAxiosService";

export function getMovies() {
  return http.get("/users/");
}

export function saveUser(user) {
  if (!user._id) {
    return http.post("/users", user);
  }
}
