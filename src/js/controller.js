import * as model from '../js/model.js';
import * as config from './views/config.js';
import contentView from './views/contentView.js';
import firstLoadView from './views/firstLoadView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlContent = function () {
  try {
    model.getMovies(config.API_URL);

    model.createMovieObjects(model.state.search.results);

    setTimeout(() => {
      if (model.state.search.results.length !== 0) {
        contentView.render(model.state.search.results);
        contentView.test();

        // afterInit();
      }
    }, 500);
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

const init = function () {
  contentView.addHandlerRenderContent(controlWindowSize);
  firstLoadView.addHanddlerSearchButton(controlFirstLoad);
};

// const afterInit = function () {
//   contentView.addHandlerShowInfo(showInfo);
// };

init();
