const URL = 'https://api.thecatapi.com/v1/breeds';
const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_nK9ciRiE7tULfhmjn7zwKauGyocrBC4MuGV73OC5X1qoZ40XllL4pITdKYnHpAg1';

function fetchBreeds() {
  return fetch(`${URL}?api_key=${API_KEY}`).then(res => res.json());
}

function fetchCatByBreed(breedId) {
  return fetch(`${URL_SEARCH}?api_key=${API_KEY}&q=${breedId}`).then(res =>
    res.json()
  );
}

export default { fetchBreeds, fetchCatByBreed };
