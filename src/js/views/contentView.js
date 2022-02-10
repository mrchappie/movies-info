// import { forEach } from 'core-js/core/array';
import firstLoadView from './firstLoadView';

class ContentView {
  _parentElement = document.querySelector('.content');
  _movieElement = document.querySelectorAll('.movie');
  _errorMesage = 'Something went wrong, please try again!`';
  _succesMesage = '';

  //   addHandlerRenderContent(handler) {
  //     window.addEventListener('resize', handler);
  //   }

  addHandlerRenderContent(handler) {
    ['resize'].forEach(ev => window.addEventListener(ev, handler));
  }

  test() {
    this._parentElement.style.display = 'flex';

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let movie, index, movieDivHeight, movieDivWidth;

    this._movieElement.forEach(function (mov, idx) {
      const movieDim = mov.getBoundingClientRect();

      movieDivHeight = movieDim.height;
      movieDivWidth = movieDim.width;
      movie = mov;
      index = idx;

      //   console.log(mov, windowWidth);

      for (let i = 0; i < 10; i++) {
        if (windowWidth > 1500) {
          movie.style.width = `${windowWidth / 5}px`;
          movie.style.height = `${windowHeight / 2}px`;
          break;
        }

        if (windowWidth < 1500 && windowWidth > 1200) {
          movie.style.width = `${windowWidth / 4}px`;
          movie.style.height = `${windowHeight / 2}px`;
          break;
        }

        if (windowWidth < 1200 && windowWidth > 900) {
          movie.style.width = `${windowWidth / 2}px`;
          movie.style.height = `${windowHeight / 2}px`;
          break;
        }

        if (windowWidth < 900 && windowWidth > 600) {
          movie.style.width = `${windowWidth / 2}px`;
          movie.style.height = `${windowHeight / 2}px`;
          break;
        }

        if (windowWidth < 600) {
          movie.style.width = `${windowWidth}px`;
          movie.style.height = `${windowHeight}px`;
          break;
        }
      }
    });
  }

  moveSearch() {
    firstLoadView.moveSearchBar();
  }

  _generateMarkup() {
    return `
    <div class="content" id="content">
        <div class="movie">
          <div class="movie__poster"></div>
        </div>
        
    </div>
  `;
  }
}

export default new ContentView();
