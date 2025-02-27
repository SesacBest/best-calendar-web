import api from './axios';
const ENDPOINT = '/calendar';

const taskApi = {

  taskcreate: async (formData) => {

    console.log(formData);

    const response = await api.post(`${ENDPOINT}/tasks`, formData);
    return response;
  }
};

export default taskApi;
