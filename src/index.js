import './css/styles.css';
import { refs } from './js/refs.js';
import pictureGalleryTpl from './templates/pictureGalleryTpl.hbs';
import { getCurrentPicture } from './api/getCurrentPicture';
import Notiflix from 'notiflix';

const createPictureGalleryMarkup = pictures => {
  return pictures.map(picture => pictureGalleryTpl(picture)).join('');
};

const renderGallery = pictures => {
  refs.gallery.innerHTML = createPictureGalleryMarkup(pictures);
};

const onFormSubmitRender = event => {
  event.preventDefault();
  const stringOfSearch = event.currentTarget.elements.searchQuery.value;
  getCurrentPicture(stringOfSearch)
    .then(renderGallery)
    .catch(error => Notiflix.Notify.failure('ouuu'));
};

refs.form.addEventListener('submit', onFormSubmitRender);
