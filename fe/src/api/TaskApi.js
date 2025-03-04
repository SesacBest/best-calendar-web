import api from './axios';
const ENDPOINT = '/calendar/tasks';

const taskApi = {

  taskcreate: async (formData) => {
    const response = await api.post(`${ENDPOINT}`, formData);
    return response;
  },
  tasks: async (date) => {
    const response = await api.get(`${ENDPOINT}?date=${date}`);
    return response;
  },
  taskupdate: async (id, checked) => {
    const response = await api.put(`${ENDPOINT}/${id}`, { isCompleted: checked });
    return response;
  },
  taskdelete: async (id) => {
    console.log(id);
    
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  }
};

export default taskApi;
