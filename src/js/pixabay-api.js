import axios from 'axios';

const API_KEY = '55520229-6b38dd18315a985816c1e4a23';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(({ data }) => data);
}
