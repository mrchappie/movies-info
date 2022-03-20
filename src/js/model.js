// import './searchBtn.js';
// import './views/contentView.js';
import './views/helpers.js';
import { getMovieTrailer } from './views/helpers.js';
import { getJSONBySearch } from './views/helpers.js';
import { getJSONByMostPopular } from './views/helpers.js';
import * as config from './views/config.js';
import { async } from 'regenerator-runtime';

export const state = {
  movie: {
    //here is an array for movies by search
    movieBySearch: {
      results: [],
      movies: [],
      trailers: [],
      trailer: [],
    },
    //here is an array for most popular movies, eg. TOP 20
    movieByMostPopular: {
      results: [],
      movies: [],
      trailers: [],
      trailer: [],
    },

    //trailerView temp. data
    trailerData: {
      search: [],
      popular: [],
    },
  },
};

export const createMovieObjectsBySearch = function () {
  state.movie.movieBySearch.movies = state.movie.movieBySearch.results.map(
    mov => {
      return {
        id: mov.id,
        title: mov.title,
        description: mov.description,
        posterUrl: mov.posterUrl,
        releaseDate: mov.releaseDate,
        video: mov.video,
        voteAverage: mov.voteAverage,
      };
    }
  );
};

export const createMovieObjectsByPopular = function () {
  state.movie.movieByMostPopular.movies =
    state.movie.movieByMostPopular.results.map(mov => {
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

//get initial movies
export const getMoviesBySearch = async function (url) {
  try {
    const data = await getJSONBySearch(`${url}`);

    state.movie.movieBySearch.results = data.results.map(mov => {
      return {
        id: mov.id,
        // genreId: mov.genre_ids,
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

    console.log(state.movie.movieBySearch.results);
  } catch (err) {
    console.error(err);
  }
};

export const getMoviesByMostPopular = async function (url) {
  try {
    const data = await getJSONByMostPopular(`${url}`);

    state.movie.movieByMostPopular.results = data.results.map(mov => {
      return {
        id: mov.id,
        // genreId: mov.genre_ids,
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

    console.log(state.movie.movieByMostPopular.results);
  } catch (err) {
    console.error(err);
  }
};

export const getTrailerBySearch = async function (url) {
  try {
    const data = await getMovieTrailer(`${url}`);
    console.log(data);
    state.movie.movieBySearch.trailers = data.results.map(trailer => {
      return {
        key: trailer.key,
        name: trailer.name,
        type: trailer.type,
      };

      // return {
      //   id: trailer.id,
      //   language: trailer.iso_639_1,
      //   adult: trailer.adult,
      //   languageCountry: trailer.iso_3166_1,
      //   name: trailer.name,
      //   key: trailer.key,
      //   official: trailer.official,
      //   releaseDate: trailer.published_at,
      //   site: trailer.site,
      //   size: trailer.size,
      //   type: trailer.type,
      // };
    });
    console.log(state.movie.movieBySearch.trailers);
    // chooseTrailer(state.movie.trailer);
  } catch (err) {
    console.log(err);
  }
};

export const getTrailerByMostPopular = async function (url) {
  try {
    const data = await getMovieTrailer(`${url}`);

    state.movie.movieByMostPopular.trailers = data.results.map(trailer => {
      return {
        key: trailer.key,
        name: trailer.name,
        type: trailer.type,
      };

      // return {
      //   id: trailer.id,
      //   language: trailer.iso_639_1,
      //   adult: trailer.adult,
      //   languageCountry: trailer.iso_3166_1,
      //   name: trailer.name,
      //   key: trailer.key,
      //   official: trailer.official,
      //   releaseDate: trailer.published_at,
      //   site: trailer.site,
      //   size: trailer.size,
      //   type: trailer.type,
      // };
    });
    console.log(state.movie.movieByMostPopular.trailers);
    // chooseTrailer(state.movie.trailer);
  } catch (err) {
    console.log(err);
  }
};

// const chooseTrailer = function (obj) {
//   try {
//     const trailers = state.movie.trailers;

//     state.movie.trailer = trailers.filter(
//       trailer => Object.values(trailer).indexOf('Official Trailer') > -1
//     );

//     console.log(state.movie.trailer);
//   } catch (err) {
//     console.error(err);
//   }
// };

// export let movData;

// export const searchMovieAfterTrailer = function (id) {
//   const data = id;
//   movData = state.search.results.filter(
//     el => Object.values(el).indexOf(+data) > -1
//   );
// };

// export const showMovies = function (movies) {
//   const [...data] = movies;

//   console.log(data);
// };
