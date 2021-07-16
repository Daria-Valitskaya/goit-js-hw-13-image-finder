import './sass/main.scss';
import { refs } from './js/refs.js';
import imageCard from './templates/imageCard.hbs';
// export const refs = {
//   input: document.querySelector('#search-form'),
//   searchBtn: document.querySelector('.search-btn'),
//   gallery: document.querySelector('.gallery'),
//   loadMore: document.querySelector('[data-action="load-more"]'),
// };

const renderCard = refs.gallery.insertAdjacentHTML('beforeend', imageCard());
