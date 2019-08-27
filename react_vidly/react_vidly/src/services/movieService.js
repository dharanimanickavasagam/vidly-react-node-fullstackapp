import http from "../httpAxiosModule/httpAxiosService";

export function getMovies() {
  return http.get("/movies/");
}

export function getMovie(_id) {
  return http.get("/movies/" + _id);
}

export function deleteMovie(_id) {
  http.delete("/movies/" + _id);
}

export function saveMovie(movie) {
  const id = movie._id;
  if (id) {
    const body = { ...movie };
    delete body._id;
    return http.put("/movies/" + id, body);
  }

  return http.post("/movies/", movie);
}
