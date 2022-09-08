import axios from 'axios';
// Vercel site
// const BASE_URL = 'https://backend-two-gamma.vercel.app/';
const BASE_URL = '';

// export default axios.create({
//   baseURL: BASE_URL,
// });

export const axiosPrivate = axios.create({
  // baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
