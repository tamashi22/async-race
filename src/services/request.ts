import axios from 'axios';
const BASE_URL = process.env.API_URL;
const axiosRequest = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});
export { axiosRequest as request };
