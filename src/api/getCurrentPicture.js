import Notiflix from 'notiflix';
import { api } from './api';

export const getCurrentPicture = async picture => {
  try {
    const response = await api.get('/weather', { params: { picture } });
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
};
