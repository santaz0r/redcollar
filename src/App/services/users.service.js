import httpService from './http.service';

const usersEndpoint = '/users';

const usersService = {
  getUsers: async () => {
    const { data } = await httpService.get(usersEndpoint);
    return data;
  },

  getMe: async (token) => {
    const { data } = await httpService.get(`${usersEndpoint}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default usersService;
