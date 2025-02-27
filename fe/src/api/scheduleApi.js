import api from './axios';
const ENDPOINT = '/calendar';

const scheduleApi = {

  schedulecreate: async (formData) => {
    const response = await api.post(`${ENDPOINT}/schedules`, formData);
    return response;
  }
};

export default scheduleApi;
