import axios from 'axios';
// Vercel site
const BASE_URL = 'https://backend-two-gamma.vercel.app/';


export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: false,
});
