import './css/styles.css';
import { refs } from './js/refs.js';
import pictureGalleryTpl from './templates/pictureGalleryTpl.hbs';
import { getCurrentPicture } from './api/getCurrentPicture';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    .then(data => {
      renderGallery(data);
      let lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => Notiflix.Notify.failure('Some error here'));
};

refs.form.addEventListener('submit', onFormSubmitRender);
