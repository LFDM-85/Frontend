import axios from 'axios';
// Vercel site
const BASE_URL = 'https://backend-two-gamma.vercel.app/';


export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
  withCredentials: false,
});
