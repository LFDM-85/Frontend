import axios from 'axios';
// Vercel site
const BASE_URL = 'https://backend-two-gamma.vercel.app';
// const BASE_URL = 'http://localhost:5000';



export default axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});
