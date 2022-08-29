import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pixabay.com',
  params: {
    key: '29586318-be42348f9d86dafd6196efc0c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});
