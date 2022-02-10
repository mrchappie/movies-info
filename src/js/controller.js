import * as model from '../js/model.js';
import contentView from './views/contentView.js';
import firstLoadView from './views/firstLoadView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlContent = function () {
  try {
    contentView.test();
    contentView.moveSearch();
  } catch (err) {
    console.error(err);
  }
};

const controlFirstLoad = function (e) {
  try {
    e.preventDefault();

    controlContent();
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  contentView.addHandlerRenderContent(controlContent);
  firstLoadView.addHanddlerSearchButton(controlFirstLoad);
};

init();
