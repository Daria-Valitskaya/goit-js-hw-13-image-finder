import './sass/main.scss';
import { refs } from './js/refs.js';
import imageCard from './templates/imageCard.hbs';
import ImageApiServise from './js/apiService';
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('.input'),
//   searchBtn: document.querySelector('.search-btn'),
//   gallery: document.querySelector('.gallery'),
//   loadMore: document.querySelector('[data-action="load-more"]'),
// };

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

const newApiService = new ImageApiServise();

function onSearch(event) {
  event.preventDefault();
  clearImageContainer();
  refs.loadMore.classList.remove('is-hidden');
  newApiService.query = event.currentTarget.query.value.trim().toLowerCase();
  newApiService.resetPage();
  newApiService.fetchImage().then(renderImageCard);
}
function onLoadMore(event) {
  newApiService.fetchImage().then(renderImageCard).then(scrollintoView);
}

function renderImageCard(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
}

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}

function scrollintoView() {
  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
