import './css/styles.css';
import { refs } from './js/refs.js';
import pictureGalleryTpl from './templates/pictureGalleryTpl.hbs';
import { getCurrentPicture } from './api/getCurrentPicture';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let stringOfSearch = '';
let page = 1;
let pictureAmount = 0;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const options = {
  root: null,
  rootMargin: '250px',
  threshold: 1,
};
const observer = new IntersectionObserver(updateGallery, options);

const createPictureGalleryMarkup = pictures => {
  return pictureGalleryTpl(pictures.data.hits);
};

const renderGallery = pictures => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    createPictureGalleryMarkup(pictures)
  );
};

const onFormSubmitRender = event => {
  event.preventDefault();
  observer.disconnect();
  refs.gallery.innerHTML = '';
  stringOfSearch = event.currentTarget.elements.searchQuery.value;
  if (stringOfSearch === '') {
    Notiflix.Notify.failure('Please, enter some name');
    return;
  }
  getCurrentPicture(stringOfSearch).then(dataPictures => {
    if (dataPictures.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(
      `Hooray! We found ${dataPictures.data.totalHits} images.`
    );
    renderGallery(dataPictures);
    lightbox.refresh();
    observer.observe(refs.guard);
  });
};

refs.form.addEventListener('submit', onFormSubmitRender);

function updateGallery(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      getCurrentPicture(stringOfSearch, (page += 1)).then(dataPictures => {
        if (
          dataPictures.data.hits.length * page >=
          dataPictures.data.totalHits
        ) {
          Notiflix.Notify.failure(
            'We are sorry, but you have reached the end of search results.'
          );
          return;
        }

        renderGallery(dataPictures);
        lightbox.refresh();
      });
    }
  });
}
