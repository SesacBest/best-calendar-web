import api from './axios';
const ENDPOINT = '/calendar/schedules';

const scheduleApi = {

  schedulecreate: async (formData) => {
    const response = await api.post(`${ENDPOINT}`, formData);
    return response;
  },
  schedules: async (date) => {
    const response = await api.get(`${ENDPOINT}?date=${date}`);
    return response;
  },
  scheduledelete: async (id) => {
    console.log(id);
    
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  }
};

export default scheduleApi;
