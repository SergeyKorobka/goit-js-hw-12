import axios from 'axios';

const API_KEY = '55520229-6b38dd18315a985816c1e4a23';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 15;

export async function getImagesByQuery(query, page = 1) {
  const { data } = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });

  data.total_pages = Math.ceil(data.totalHits / perPage);

  return data;
}
