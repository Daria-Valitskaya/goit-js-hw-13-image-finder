const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22530693-10a6882b39438d2f880057b1b';

export default class ImageApiServise {
  constructor() {
    this.keyword = '';
    this.page = 1;
  }
  fetchImage(keyword) {
    fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.keyword}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(r => r.json())
      .then(data => {
        this.page += 1;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.keyword;
  }
  set query(newKeyword) {
    this.keyword = newKeyword;
  }
}
