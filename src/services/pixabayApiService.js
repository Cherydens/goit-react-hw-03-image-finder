import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36326636-76b3e37fcbe8c7da541d5c25c';

export const searchParams = {
  key: API_KEY,
  q: '',
  image_type: 'all',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 12,
};

export async function pixabayApiService(params) {
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
