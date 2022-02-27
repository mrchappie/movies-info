import * as model from '../js/model.js';
import * as config from './views/config.js';
import contentView from './views/contentView.js';
import firstLoadView from './views/firstLoadView.js';
import searchView from './views/searchView.js';
import trailerView from './views/trailerView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlContent = function () {
  try {
    const query = searchView.getQuery();

    if (query) {
      console.log(query);
      model.getMoviesBySearch(`${config.SEARCH_API}${query}"`);

      model.createMovieObjectsBySearch();

      setTimeout(() => {
        if (model.state.movie.movieBySearch.results.length !== 0) {
          contentView.render(model.state.movie.movieBySearch.results);
          contentView.resizeContentToFitPage();
          // model.getTrailerBySearch(
          //   `${config.SEARCH_TRAILER_1}${634649}${config.SEARCH_TRAILER_2}`
          // );
        }
      }, 500);
    } else if (!query) {
      model.getMoviesByMostPopular(config.API_URL);

      model.createMovieObjectsByPopular();

      setTimeout(() => {
        if (model.state.movie.movieByMostPopular.results.length !== 0) {
          contentView.render(model.state.movie.movieByMostPopular.results);
          contentView.resizeContentToFitPage();
          // model.getTrailerByMostPopular(
          //   `${config.SEARCH_TRAILER_1}${634649}${config.SEARCH_TRAILER_2}`
          // );
        }
      }, 500);
    }
  } catch (err) {
    console.error(err);
  }
};

const controlFirstLoad = function (e) {
  try {
    e.preventDefault();
    contentView._clear();

    // setTimeout(() => controlWindowSize(), 500);
    controlContent();
  } catch (err) {
    console.error(err);
  }
};

const controlWindowSize = function () {
  try {
    if (
      model.state.movie.movieBySearch.results.length === 0 &&
      model.state.movie.movieByMostPopular.results.length === 0
    )
      return;

    contentView.resizeContentToFitPage();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const controlClickedMovie = function (e, type) {
  trailerView._movieID = e.dataset.mov;

  if (type === 'popular') {
    console.log(type);
    trailerView._searchForTrailers(type);
    setTimeout(() => {
      trailerView._filterMoviesArrForID(
        model.state.movie.movieByMostPopular.results,
        trailerView._movieID,
        type
      );
      trailerView._filterTrailersArr(
        model.state.movie.movieByMostPopular.trailers,
        type
      );
      trailerView.renderTrailer(
        model.state.movie.trailerData.popular,
        model.state.movie.movieByMostPopular.trailer
      );
    }, 500);
  } else if (type === 'search') {
    console.log(type);
    trailerView._searchForTrailers(type);
    setTimeout(() => {
      trailerView._filterMoviesArrForID(
        model.state.movie.movieBySearch.results,
        trailerView._movieID,
        type
      );
      trailerView._filterTrailersArr(
        model.state.movie.movieBySearch.trailers,
        type
      );
      trailerView.renderTrailer(
        model.state.movie.trailerData.search,
        model.state.movie.movieBySearch.trailer
      );
    }, 500);
  }
  contentView._movieAbout.style.display = 'flex';
  contentView._parentElement.style.display = 'none';
  searchView._parentEl.style.display = 'none';
};

const controlBackHome = function () {
  console.log('CLEARED');

  contentView._movieAbout.style.display = 'none';
  contentView._parentElement.style.display = 'none';
  searchView._parentEl.style.display = 'flex';

  contentView._clearObjects();
  trailerView._clear();
};

const init = function () {
  contentView.addHandlerRenderContent(controlWindowSize);
  contentView.addHandlerBackHome(controlBackHome);

  firstLoadView.addHanddlerSearchButton(controlFirstLoad);
  trailerView.addHandlerClickedMovie(controlClickedMovie);
};

init();
