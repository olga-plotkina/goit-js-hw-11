import Notiflix from 'notiflix';
import { api } from './api';

export const getCurrentPicture = async picture => {
  try {
    const response = await api.get('/api', { params: { q: picture } });
    return response.data.hits;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
};
