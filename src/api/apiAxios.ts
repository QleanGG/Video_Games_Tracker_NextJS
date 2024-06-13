import axios from 'axios';

const mainApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`, 
  withCredentials: true,
});

export default mainApi;
