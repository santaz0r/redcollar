import httpService from './http.service';

const eventsEndPoint = `/upload`;

const fileService = {
  uploadFiles: async (payload) => {
    const { data } = await httpService.post(`${eventsEndPoint}`, payload);
    console.log(data);
    return data;
  },
};

export default fileService;
