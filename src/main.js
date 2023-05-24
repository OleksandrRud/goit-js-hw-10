import API from './cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// let storedBreeds = [];

API.fetchCatByBreed('breedId').then(resolt => console.log(resolt));
API.fetchBreeds().then(data => {
  data = data.filter(img => img.image?.url != null);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    // storedBreeds = data;
    const breed = data[i];
    let option = document.createElement('option');

    // if (!breed.image) continue;

    option.value = i;
    console.log(option);
    option.innerHTML = `${breed.name}`;
    refs.select.appendChild(option);
  }
  // return showBreedImage(0);
});
