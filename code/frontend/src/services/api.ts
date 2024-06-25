import axios from 'axios';
import { User } from '../hooks/useAuth';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
});

api.interceptors.request.use(
  async (config) => {
    const jsonString =
      localStorage.getItem('@Dysrup:user') ??
      `{
      "id": "", 
      "name": "", 
      "email": "", 
      "login": "",
      "accessToken": ""
    }`;

    const userObject: User = JSON.parse(jsonString);
    const tokenContent = userObject.accessToken;
    const resultString = tokenContent.replace(/[{}"]/g, '');

    if (resultString && config.headers) {
      config.headers['Authorization'] = `Bearer ${resultString}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
      alert('Sua sessão expirou!');
    }

    return Promise.reject(error);
  }
);

export default api;
