'use strict';

import '../js/searchBtn.js';

const URL = 'https://imdb8.p.rapidapi.com/auto-complete?q=no%20way%20home';
const API_KEY = 'cf5b5fe683msh3d4579d547c9747p125e10jsn21fe9950b3a3';

const getMovieData = async function (url) {
  try {
    const result = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'cf5b5fe683msh3d4579d547c9747p125e10jsn21fe9950b3a3',
      },
    });
    const data = await result.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// getMovieData(`${URL}`);

const searchBtn = document.querySelector('.search');
const searchField = document.querySelector('.search__field');

searchBtn.addEventListener('submit', function (e) {
  e.preventDefault();

  searchField.style.width = '2em';
  // searchField.style.backgroundColor = 'transparent';
  // searchField.style.border = 'none';
  // searchField.style.border = 'transparent';
});
