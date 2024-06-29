import httpService from './http.service';
import { query } from '../config.json';

const eventsEndPoint = `/events`;

const eventsService = {
  getEvents: async () => {
    const { data } = await httpService.get(`${eventsEndPoint}${query}`);
    return data;
  },

  joinLeaveEvent: async (payload) => {
    const membersId = payload.participants.map((i) => i.id);
    const photoId = payload.photos.map((i) => i.id);
    const ownerId = payload.owner.id;

    const transformed = {
      ...payload,
      participants: membersId,
      photos: photoId,
      owner: ownerId,
    };
    await httpService.put(`${eventsEndPoint}/${payload.id}`, { data: transformed });
    const { data } = await httpService.get(`${eventsEndPoint}${query}`);

    return data;
  },
};

export default eventsService;
