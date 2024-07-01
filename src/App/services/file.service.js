import httpService from './http.service';

const eventsEndPoint = `/upload`;

const fileService = {
  uploadFiles: async (payload) => {
    const { data } = await httpService.post(`${eventsEndPoint}`, payload);
    return data;
  },

  deleteFile: async (id) => {
    const { data } = await httpService.delete(`${eventsEndPoint}/files/${id}`);
    return data;
  },
};

export default fileService;
