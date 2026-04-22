import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

iziToast.settings({
  pauseOnHover: true,
  position: 'topRight',
});

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { ['search-text']: searchTextEl } = e.target.elements;

  clearGallery();

  if (searchTextEl.value === '') {
    return;
  }

  showLoader();
  getImagesByQuery(searchTextEl.value)
    .then(onFulfilled)
    .catch(e => {
      iziToast.error({
        message: e.message,
      });
    })
    .finally(hideLoader);
}

function onFulfilled(data) {
  if (!data.hits.length) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  createGallery(data.hits);
}
