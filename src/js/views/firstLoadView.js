import contentView from './contentView';

class FirstLoadView {
  _parentElement = document.getElementById('search');
  _searchBtn = document.querySelector('.search__btn');

  addHanddlerSearchButton(handler) {
    this._parentElement.addEventListener('submit', handler);
  }

  moveSearchBar() {
    this._parentElement.classList.add('over__content');
  }
}

export default new FirstLoadView();

// const searchBtn = document.querySelector('.search');
// const searchField = document.querySelector('.search__field');

// searchBtn.addEventListener('submit', function (e) {
//   e.preventDefault();

//   searchField.style.width = '2em';
//   // searchField.style.backgroundColor = 'transparent';
//   // searchField.style.border = 'none';
//   // searchField.style.border = 'transparent';
// });
