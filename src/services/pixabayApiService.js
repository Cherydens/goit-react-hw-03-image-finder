import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36326636-76b3e37fcbe8c7da541d5c25c';

export default async function pixabayApiService({
  searchQuerry,
  page,
  IMAGES_PER_PAGE,
}) {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuerry}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${IMAGES_PER_PAGE}`
  );
  return response.data;
}
