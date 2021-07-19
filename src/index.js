import './sass/main.scss';
import { refs } from './js/refs.js';
import imageCard from './templates/imageCard.hbs';
import ImageApiServise from './js/apiService';
import * as basicLightbox from 'basiclightbox';

import { alert, error, defaultModules } from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';
import '@pnotify/countdown/dist/PNotifyCountdown.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', fullImage);

const newApiService = new ImageApiServise();

function onSearch(event) {
  event.preventDefault();
  clearImageContainer();

  if (event.currentTarget.query.value.trim() !== '') {
    newApiService.query = event.currentTarget.query.value.trim().toLowerCase();
    newApiService.resetPage();
    newApiService.fetchImage().then(renderImageCard);
    clearInput();
  } else {
    emptyQuery();
    clearInput();
    return refs.loadMore.classList.add('is-hidden');
  }
  return clearInput();
}
function onLoadMore(event) {
  newApiService.fetchImage().then(renderImageCard).then(scrollintoView);
}

function renderImageCard(hits) {
  if (hits.length !== 0) {
    refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
    refs.loadMore.classList.remove('is-hidden');
    if (hits.length < 12) {
      refs.loadMore.classList.add('is-hidden');
      return noMoreImages();
    }
  } else {
    noResults();
    clearInput();
    return refs.loadMore.classList.add('is-hidden');
  }
}

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}

function scrollintoView() {
  setTimeout(() => {
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 200);
}

function fullImage(event) {
  basicLightbox
    .create(
      `
      <div class="modal">
  <img src=${event.target.alt} width="800" height="600">
      </div>
  `,
    )
    .show(event);
}

function clearInput() {
  refs.input.value = '';
}

function noResults() {
  error({
    title: 'No matches found.',
    text: 'Please enter different query!',
    delay: 2000,
    modules: new Map([...defaultModules, [PNotifyCountdown, {}]]),
  });
}

function emptyQuery() {
  alert({
    title: 'Query is empty.',
    text: 'Please enter something!',
    delay: 2000,
    modules: new Map([...defaultModules, [PNotifyCountdown, {}]]),
  });
}

function noMoreImages() {
  error({
    title: 'There are no more images in this category.',
    text: 'Please enter different query!',
    delay: 2000,
    modules: new Map([...defaultModules, [PNotifyCountdown, {}]]),
  });
}
