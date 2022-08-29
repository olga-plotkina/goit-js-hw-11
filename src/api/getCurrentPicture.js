import Notiflix from 'notiflix';
import { api } from './api';

export const getCurrentPicture = async (picture, page = 1) => {
  try {
    const response = await api.get('/api', { params: { q: picture, page } });
    return response;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
};
