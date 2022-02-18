import * as model from '../js/model.js';
import * as config from './views/config.js';
import contentView from './views/contentView.js';
import firstLoadView from './views/firstLoadView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlContent = function () {
  try {
    const query = searchView.getQuery();

    if (query) {
      console.log(query);
      model.getMovie(`${config.SEARCH_API}${query}"`);

      model.createMovieObjects(model.state.search.resultsBySearch);

      setTimeout(() => {
        if (model.state.search.resultsBySearch.length !== 0) {
          contentView.render(model.state.search.resultsBySearch);
          contentView.test();

          // afterInit();
        }
      }, 500);
    } else if (!query) {
      model.getMovies(config.API_URL);

      model.createMovieObjects(model.state.search.results);

      setTimeout(() => {
        if (model.state.search.results.length !== 0) {
          contentView.render(model.state.search.results);
          contentView.test();

          // afterInit();
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
    if (model.state.search.results.length === 0) return;
    // throw new Error('Something is wrong!');

    contentView.test();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const showInfo = function () {
  try {
    contentView._showMovieInfo();
  } catch (err) {
    console.error(err);
  }
};

const controlClickedMovie = function (e) {
  movId = e.dataset.mov;

  model.getTrailer(
    `${config.SEARCH_TRAILER_1}${movId}${config.SEARCH_TRAILER_2}`
  );

  contentView._movieAbout.style.display = 'flex';

  setTimeout(() => {
    model.searchMovieAfterTrailer(movId);
  }, 200);

  setTimeout(() => {
    contentView.renderTrailer(model.state.movie.trailer);
  }, 500);

  contentView._parentElement.style.display = 'none';
  searchView._parentEl.style.display = 'none';
};

const init = function () {
  contentView.addHandlerRenderContent(controlWindowSize);
  firstLoadView.addHanddlerSearchButton(controlFirstLoad);
  contentView.addHandlerCleckedMovie(controlClickedMovie);
};

// const afterInit = function () {
//   contentView.addHandlerShowInfo(showInfo);
// };

init();
