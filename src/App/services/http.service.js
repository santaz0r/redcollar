import axios from 'axios';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use((config) => {
  if (!localStorage.getItem('token')) return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
