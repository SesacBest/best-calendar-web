import api from './axios';
const ENDPOINT = '/calendar/diaries';

const diaryApi = {
  // 일기 생성 api
  createDiary: async (data) => {
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data;
  },

  // 일기 조회 api
  getDiary: async (date) => {
    const response = await api.get(`${ENDPOINT}?date=${date}`);
    return response.data;
  },

  // 일기 수정 api
  updateDiary: async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
  },

  // 일기 삭제 api
  deleteDiary: async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  },
};

export default diaryApi;