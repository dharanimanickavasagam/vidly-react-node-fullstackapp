import axios from "axios";
import { getJwtToken } from "../services/authService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log("Serving from : ", process.env.REACT_APP_API_URL);
axios.defaults.headers.common["x-auth-token"] = getJwtToken();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Something went wrong");
    alert("Something went wrong!");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
