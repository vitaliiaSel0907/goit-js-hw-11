import { getImagesByQuery } from './pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // зупиняємо перезавантаження сторінки

  const query = form.elements['search-text'].value.trim();

  
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query' });
    return;
  }

  clearGallery();  
  showLoader();   

  try {
    const data = await getImagesByQuery(query); 

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
    } else {
      createGallery(data.hits); 
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again.' });
  } finally {
    hideLoader(); 
  }
});
