import axios from 'axios';
import store from '../store/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// 요청 인터셉터 추가 (로그인 이후 요청)
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;