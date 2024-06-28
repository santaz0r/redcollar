import httpService from './http.service';
import { query } from '../config.json';

const eventsEndPoint = `/events`;

const eventsService = {
  getEvents: async () => {
    const { data } = await httpService.get(`${eventsEndPoint}${query}`);
    return data;
  },
  //   createTodo: async (payload) => {
  //     const { data } = await httpService.post(eventsEndPoint, payload);
  //     return data;
  //   },
};

export default eventsService;
