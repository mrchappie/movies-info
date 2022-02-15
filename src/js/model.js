// import './searchBtn.js';
// import './views/contentView.js';
import './views/helpers.js';
import { getJSON } from './views/helpers.js';
import * as config from './views/config.js';

// const URL = 'https://imdb8.p.rapidapi.com/auto-complete?q=no%20way%20home';
// const API_KEY = 'cf5b5fe683msh3d4579d547c9747p125e10jsn21fe9950b3a3';

// const getMovieData = async function (url) {
//   try {
//     const result = await fetch(`${url}`, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-host': 'imdb8.p.rapidapi.com',
//         'x-rapidapi-key': 'cf5b5fe683msh3d4579d547c9747p125e10jsn21fe9950b3a3',
//       },
//     });
//     const data = await result.json();

//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// getMovieData(`${URL}`);

export const state = {
  movie: {
    //here is an array for a single movie
    movieBySearch: [],
    //here is an array for multiple movies, eg. TOP 100
    movieByResults: [],
  },
  search: {
    results: [],
  },
};

export const createMovieObjects = function (movie) {
  state.movie.movieByResults = state.search.results.map(mov => {
    return {
      id: mov.id,
      title: mov.title,
      description: mov.description,
      posterUrl: mov.posterUrl,
      releaseDate: mov.releaseDate,
      video: mov.video,
      voteAverage: mov.voteAverage,
    };
  });
};

const createMovieObject = function (movie) {
  const mov = movie.results;

  return {
    id: mov.id,
    title: mov.original_title,
    description: mov.overview,
    posterUrl: mov.poster_path,
    releaseDate: mov.release_date,
    video: mov.video,
    voteAverage: mov.vote_average,
  };
};

//get initial movies
export const getMovie = async function (url) {
  try {
    const data = await getJSON(`${url}`);

    state.movie = createMovieObject(data);

    console.log(state.movie);
  } catch (err) {
    console.error(err);
  }
};

export const getMovies = async function (url) {
  try {
    const data = await getJSON(`${url}`);

    state.search.results = data.results.map(mov => {
      return {
        id: mov.id,
        genreId: mov.genre_ids,
        adult: mov.adult,
        language: mov.original_language,
        title: mov.original_title,
        description: mov.overview,
        popularity: mov.popularity,
        posterUrl: mov.poster_path,
        wallpaper: mov.backdrop_path,
        releaseDate: mov.release_date,
        video: mov.video,
        voteAverage: mov.vote_average,
        voteCount: mov.vote_count,
      };
    });

    console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

// export const showMovies = function (movies) {
//   const [...data] = movies;

//   console.log(data);
// };
