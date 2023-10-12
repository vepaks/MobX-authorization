import axios from "axios";
export const API_URL = "http://localhosr:5000";

const $api = axios.create({
  // всеки път закачаме бисквитката
  withCredentials: true,
  baseURL: API_URL,
});
//  инрерцептор на req
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
export default axios;
