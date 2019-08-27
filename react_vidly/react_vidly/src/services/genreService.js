import http from "../httpAxiosModule/httpAxiosService";

export function getGenres() {
  //return http.get(config.genresEndPoint + "/");
  return http.get("/genres");
}
