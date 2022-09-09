import axios from 'axios';
// Vercel site
const BASE_URL = 'https://backend-two-gamma.vercel.app:5000/';


export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
