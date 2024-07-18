import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://memegen-fw7l.onrender.com/api',
});

export default axiosInstance;
