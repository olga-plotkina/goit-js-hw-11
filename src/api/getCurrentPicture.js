import Notiflix from 'notiflix';
import { api } from './api';

export const getCurrentPicture = async (q, page = 1) => {
  try {
    const response = await api.get('', {
      params: {
        q,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    });
    return response;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
};
