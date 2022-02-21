import contentView from './contentView';

class FirstLoadView {
  _parentElement = document.getElementById('search');
  _searchBtn = document.querySelector('.search__btn');

  addHanddlerSearchButton(handler) {
    this._parentElement.addEventListener('submit', handler);
  }

  // moveSearchBar() {
  //   this._parentElement.classList.add('over__content');
  // }
}

export default new FirstLoadView();
