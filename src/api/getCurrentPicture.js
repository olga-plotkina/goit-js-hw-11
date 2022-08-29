import { api } from './api';

export const getCurrentPicture = async () => {
  try {
    const response = api.get('/weather', { params: {} });
    return (await response).data;
  } catch (error) {}
};
