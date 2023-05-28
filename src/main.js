import API from './cat-api.js';

import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

API.fetchBreeds()
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const breed = data[i];
      let option = document.createElement('option');
      option.value = breed.id;
      option.innerHTML = `${breed.name}`;
      refs.select.appendChild(option);
    }
    loader('none');
  })
  .catch(onError);

const onClick = e => {
  const breedId = e.currentTarget.value;
  loader('block');
  API.fetchCatByBreed(breedId)
    .then(resolt => {
      loader('none');
      const url = resolt[0].url;
      const cat = resolt[0].breeds[0].name;
      const description = resolt[0].breeds[0].description;
      const temperament = resolt[0].breeds[0].temperament;
      return createMarkup(url, cat, description, temperament);
    })
    .then(updateCatsList)
    .catch(err => {
      loader('none');
      onError(err);
    });
};

refs.select.addEventListener('change', onClick);

function createMarkup(url, cat, description, temperament) {
  return `
  <div style="display:flex">
  <img src=${url} width='1000px'  >
    <div>
    <h2 >${cat}</h2>
    <p>${description}</p>
    <p> <b>Temperament:</b> ${temperament}</p>
    </div>
    </div>`;
}

function updateCatsList(markup) {
  refs.catInfo.innerHTML = markup;
}
function onError() {
  Notiflix.Notify.failure(refs.error.textContent);
}
function loader(value) {
  refs.loader.style = `display:${value}`;
}
