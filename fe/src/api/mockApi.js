import axios from 'axios';
import store from '../store/store';

// TODO: 해당 파일은 임시적인 axios 호출을 다루므로 개발 진척에 따라 수정 요망

const api = axios.create({
  baseURL: 'https://136f3820-f5cc-4169-b8a5-f780355314a7.mock.pstmn.io/',
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const mockApi = {
  getMonthlySchedules: async (month) => {
    const response = await api.get(`get?month=${month}`);
    return response.data;
  },
};

export default mockApi;
