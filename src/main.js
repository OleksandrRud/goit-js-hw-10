import API from '../src/cat-api.js';

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
      url = resolt[0].url;
      name = resolt[0].breeds[0].name;
      description = resolt[0].breeds[0].description;
      temperament = resolt[0].breeds[0].temperament;
      return createMarkup({ url, name, description, temperament });
    })

    .then(resolt => {
      updateCatsList(resolt);
    })
    .catch(err => {
      loader('none');
      onError(err);
    });
};

refs.select.addEventListener('change', onClick);

function createMarkup() {
  return `
  <div style="display:flex">
  <img src=${url} width='1000px'  >
    <div>
    <h2 >${name}</h2>
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
