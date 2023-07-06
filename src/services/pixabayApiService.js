import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '36326636-76b3e37fcbe8c7da541d5c25c';

export default async function pixabayApiService({
  searchQuerry = '',
  page = 1,
  IMAGES_PER_PAGE = 12,
}) {
  const { data } = await axios({
    params: {
      q: searchQuerry,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: IMAGES_PER_PAGE,
    },
  });
  return data;
}
