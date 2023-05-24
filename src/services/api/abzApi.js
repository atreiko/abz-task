import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1', 
});

export const setTokenInHeaders = token => {
  if (token) {
    return (instance.defaults.headers.post['token'] = token);
  }
  instance.defaults.headers.post['token'] = '';
};

export const getToken = async () => {
  const { data } = await instance.get('/token');
  setTokenInHeaders(data.token); 
  return data;
};

export const getUsers = async (page = 1, count = 6) => {
  const { data } = await instance.get('/users', {
    params: {
      count,
      page,
    },
  });
  return data;
};

export const addUser = async formData => {
  const { data } = await instance.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getUserById = async id => {
  const { data } = await instance.get(`/users/${id}`);
  return data;
};

export const getPositions = async () => {
  const { data } = await instance.get('/positions');
  return data;
};