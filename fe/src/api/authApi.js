import api from './axios';
const ENDPOINT = '/auth';

const authApi = {
  // 회원가입 api
  signup: async (formData) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response;
  },

  // email 중복체크
  checkEmailAvailability: async (email) => {
    const response = await api.get(`${ENDPOINT}/verify-email`, { params: { username: email } });
    return response;
  },

  // 로그인 api
  login: async (formData) => {
    const response = await api.post(`${ENDPOINT}/login`, formData);
    return response;
  },

  // jwt 검사
  verify: async () => {
    const response = await api.get(`${ENDPOINT}/verify`);
    return response;
  },
};

export default authApi;
