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
// refs.gallery.insertAdjacentHTML('beforeend', imageCard(API));
const newApiService = new ImageApiServise();

function onSearch(event) {
  event.preventDefault();
  newApiService.query = event.currentTarget.query.value;
  newApiService.resetPage();
  newApiService.fetchImage();
  console.log(event.currentTarget.query.value);
}
function onLoadMore(event) {
  newApiService.fetchImage();
}
refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
