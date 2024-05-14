import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
const axiosRequest = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});
export { axiosRequest as request };
