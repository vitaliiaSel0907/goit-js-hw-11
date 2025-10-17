import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52807381-7a65b057c23058f47f8cb5df4';

export async function getImagesByQuery(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка запиту до Pixabay:', error);
    throw error;
  }
}
