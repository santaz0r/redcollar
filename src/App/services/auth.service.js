import httpService from './http.service';

const authService = {
  login: async ({ email, password }) => {
    const { data } = await httpService.post('/auth/local', {
      identifier: email,
      password,
    });
    return data;
  },
  signUp: async (payload) => {
    const { data } = await httpService.post('/auth/local/register', payload);
    return data;
  },
  logout: async () => await httpService.post('/logout'),
};

export default authService;
