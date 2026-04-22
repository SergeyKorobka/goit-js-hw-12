import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.btn-load-more');

let searchQuery = '';
let page = 1;

iziToast.settings({
  pauseOnHover: true,
  position: 'topRight',
});

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

async function onSubmit(e) {
  e.preventDefault();
  searchQuery = e.target.elements['search-text'].value.trim();
  if (searchQuery === '') return;

  clearGallery();
  page = 1;

  await fetchAndRenderGallery();
}

async function onBtnLoadMoreClick(e) {
  page += 1;

  await fetchAndRenderGallery();
  scrollAfterClickLoadMore();
}

async function fetchAndRenderGallery() {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    if (page < data.total_pages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (e) {
    iziToast.error({
      message: e.message,
    });
  } finally {
    hideLoader();
  }
}

function scrollAfterClickLoadMore() {
  const item = gallery.querySelector('.gallery-item');
  const gap = parseInt(getComputedStyle(gallery).rowGap);
  const heightEl = item.getBoundingClientRect().height;

  scrollBy({
    top: Math.round((heightEl + gap) * 2),
    behavior: 'smooth',
  });
}
