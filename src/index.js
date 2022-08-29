import './css/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const createCountryMarkup = contries => {
  return contries.map(countryCardTpl);
};

const createCountryListMarkup = contries => {
  return contries.map(countryListTpl);
};

const renderListOfCountries = countries => {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length === 1) {
    refs.listOfCountries.innerHTML = '';
    const markup = createCountryMarkup(countries);
    refs.countryCard.innerHTML = markup;
  }
  if (countries.length > 1 && countries.length <= 10) {
    refs.countryCard.innerHTML = '';
    const markupOfList = createCountryListMarkup(countries);
    refs.listOfCountries.innerHTML = markupOfList;
  }
};

const onInputSearch = e => {
  const strinOfSearch = e.target.value.trim();
  if (!strinOfSearch) {
    renderListOfCountries([]);
    return;
  }
  fetchCountries(strinOfSearch)
    .then(renderListOfCountries)
    .catch(error => Notiflix.Notify.failure(error));
};

refs.searchInput.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);
