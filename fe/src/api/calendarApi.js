import api from './axios';
const ENDPOINT = '/calendar';

const calendarApi = {
  getMonthly: async (category, month) => {
    const response = await api.get(`${ENDPOINT}/monthly-${category}?month=${month}`);
    return response;
  },
};

export default calendarApi;
