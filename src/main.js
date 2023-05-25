import API from './cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// let storedBreeds = [];

API.fetchBreeds().then(data => {
  for (let i = 0; i < data.length; i++) {
    const breed = data[i];
    let option = document.createElement('option');
    option.value = breed.id;
    option.innerHTML = `${breed.name}`;
    refs.select.appendChild(option);
  }
});

const onClick = e => {
  const breedId = e.currentTarget.value;
  API.fetchCatByBreed(breedId)
    .then(resolt => {
      url = resolt[0].url;
      name = resolt[0].breeds[0].name;
      description = resolt[0].breeds[0].description;
      temperament = resolt[0].breeds[0].temperament;
      return createMarkup(url, name, description, temperament);
    })
    .then(updateNewsList)
    .catch(onError);
};

refs.select.addEventListener('click', onClick);

function createMarkup() {
  return `
  <div >
  <img src=${url} width='1000px'  >
    <h2 >${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
    </div>`;
}

function updateNewsList(markup) {
  refs.catInfo.innerHTML = markup;
}
