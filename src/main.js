import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';
import { showMessage } from './js/showMessage';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

let searchQuery = '';
let page = 1;
let isLoading = false;

form.addEventListener('submit', onSubmit);

const observer = new IntersectionObserver(handleLoadMoreOnScroll, {
  threshold: 1,
  rootMargin: '300px',
});

async function onSubmit(e) {
  e.preventDefault();
  searchQuery = e.target.elements['search-text'].value.trim();
  if (searchQuery === '') return;

  clearGallery();
  page = 1;

  await fetchAndRenderGallery();
}

async function handleLoadMoreOnScroll(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;

      await fetchAndRenderGallery();
    }
  });
}

async function fetchAndRenderGallery() {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (!data.hits.length) {
      showMessage(
        'error',
        'Sorry, there are no images matching your search query. Please try again!'
      );

      return;
    }

    createGallery(data.hits);

    if (page < data.total_pages) {
      observer.observe(sentinel);
    } else {
      showMessage(
        'info',
        "We're sorry, but you've reached the end of search results."
      );

      observer.unobserve(sentinel);
    }
  } catch (e) {
    showMessage('error', e.message);
  } finally {
    isLoading = false;
    hideLoader();
  }
}
