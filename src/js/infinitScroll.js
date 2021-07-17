var listElm = document.querySelector('.infinite-list');

// Add 20 items.
var nextItem = 1;
var loadMore = function () {
  for (var i = 0; i < 20; i++) {
    var item = document.createElement('li');
    item.innerText = 'Item ' + nextItem++;
    listElm.appendChild(item);
  }
};

// Detect when scrolled to bottom.
listElm.addEventListener('scroll', function () {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore();
  }
});

// Initially load some items.
loadMore();

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.query !== '') {
      // console.log('Пора грузить еще статьи' + Date.now());
      newsApiService.fetchArticles().then(articles => {
        appendArticlesMarkup(articles);
        newsApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);

// LOAD MORE
const observer = new IntersectionObserver(entries => {
  const firstEntry = entries[0];

  if (firstEntry.isIntersecting) {
    if (inputButton.value) {
      pixabayApiService.page += 1;

      const infoMsg = 'No more images. This is all that was found on your request';
      const errMsg = 'Invalid query.';
      photoFetch(pixabayApiService, infoMsg, errMsg);
    }
  }
});

const scrollArea = refs.scrollArea;
observer.observe(scrollArea);
// console.log('observer 2: ', observer);
// END LOAD MORE
