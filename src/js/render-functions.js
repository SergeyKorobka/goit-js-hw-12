import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn-load-more');

const simpleLightbox = new SimpleLightbox('.gallery-item a', {
  captionDelay: 1000,
  captionsData: 'alt',
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
          <li class="gallery-item">
          <a class="gallery-thumb" href="${image.largeImageURL}"><img class="gallery-img" src="${image.webformatURL}" alt="${image.name || image.tags}" /></a>
          <ul class="gallery-content-list">
            <li class="gallery-content-item"><span>Likes</span><span>${image.likes}</span></li>
            <li class="gallery-content-item"><span>Views</span><span>${image.views}</span></li>
            <li class="gallery-content-item"><span>Comments</span><span>${image.comments}</span></li>
            <li class="gallery-content-item"><span>Downloads</span><span>${image.downloads}</span></li>
          </ul>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}
export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('is-hidden');
}
export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  btnLoadMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add('is-hidden');
}
