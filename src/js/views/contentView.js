// import { forEach } from 'core-js/core/array';
import firstLoadView from './firstLoadView';
import { IMG_PATH } from '../views/config.js';
import * as model from '../model.js';
import * as controller from '../controller.js';

class ContentView {
  _parentElement = document.getElementById('content');
  _movieElement;
  _movieInfo = document.querySelectorAll('.info');
  _movieOverlay = document.querySelector('.movie__poster__overlay');
  _movieAbout = document.querySelector('.about__movie');
  _movieInformation = document.querySelector('.information');
  // _movieTrailer = document.getElementById('trailer').src;
  // _movieTitle = document.querySelector('.title');
  // _movieYear = document.querySelector('.year');
  // _movieDescription = document.querySelector('.description');
  _errorMesage = 'Something went wrong, please try again!`';
  _succesMesage = '';

  addHandlerRenderContent(handler) {
    ['resize', 'load'].forEach(ev => window.addEventListener(ev, handler));
    // window.addEventListener('resize', handler);
  }

  addHandlerCleckedMovie(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const mov = e.target.closest('.movie__poster');

      if (!mov) return;

      handler(mov);
    });
  }

  renderTrailer(arr) {
    arr.forEach(trailer => {
      console.log(model.movData);
      this._pushTrailerMarkup(trailer);
    });
  }

  _pushTrailerMarkup(trailer) {
    const markup = `
    <div class="about">
      <span class="title">${2}</span>   
        <span class="year">
          <span>english |</span>   
            <span>2021 |</span>   
              <span>8.5</span> 
        </span>  
              <span class="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi modi dignissimos est, natus distinctio sint. Eius harum rem mollitia in repellat sapiente quos, fugiat praesentium aliquam labore minus quisquam nihil cumque ipsa asperiores? Deserunt quia delectus ducimus ea vero quo!
              </span>   
    </div>

    <div class="trailer">
        <iframe id="trailer" width="894" height="472" src="https://www.youtube.com/embed/${
          trailer.key
        }" allowfullscreen>
        </iframe>
    </div>`;

    this._movieInformation.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  test() {
    // console.log(1);

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let movie;

    const movieDivDimensions = function (
      windowWidth,
      windowHeight,
      numberOfItems
    ) {
      windowHeight = windowHeight;
      windowWidth = windowWidth;
      numberOfItems = numberOfItems;

      const width = windowWidth / numberOfItems;
      const height = (25 / 100) * width + width;

      let arr = [width, height];
      return arr;
    };

    this._movieElement.forEach(function (mov) {
      movie = mov;
      let arr;

      // console.log(mov, windowWidth);

      if (windowWidth > 1500) {
        arr = movieDivDimensions(windowWidth, windowHeight, 5);
        movie.style.width = `${arr[0]}px`;
        movie.style.height = `${arr[1]}px`;
        return;
      }

      if (windowWidth < 1500 && windowWidth > 1200) {
        arr = movieDivDimensions(windowWidth, windowHeight, 4);
        movie.style.width = `${arr[0]}px`;
        movie.style.height = `${arr[1]}px`;
        return;
      }

      if (windowWidth < 1200 && windowWidth > 900) {
        arr = movieDivDimensions(windowWidth, windowHeight, 3);
        movie.style.width = `${arr[0]}px`;
        movie.style.height = `${arr[1]}px`;
        return;
      }

      if (windowWidth < 900 && windowWidth > 600) {
        arr = movieDivDimensions(windowWidth, windowHeight, 2);
        movie.style.width = `${arr[0]}px`;
        movie.style.height = `${arr[1]}px`;
        return;
      }

      if (windowWidth < 600) {
        arr = movieDivDimensions(windowWidth, windowHeight, 1);
        movie.style.width = `${arr[0]}px`;
        movie.style.height = `${arr[1]}px`;
        return;
      }
    });
  }

  moveSearch() {
    firstLoadView.moveSearchBar();
  }

  render(arr) {
    this._parentElement.style.display = 'flex';
    arr.forEach(movie => {
      this._generateMarkup(movie);
    });
    this._movieElement = document.querySelectorAll('.movie');
  }

  // _generateAverageScore(movie) {
  //   const calcMovieStars = function (voteAverage) {
  //     voteAverage = voteAverage;

  //     let markup;

  //     const star = +voteAverage / 2;

  //     if (Number.isInteger(star) && star === 1) {
  //       markup = `
  //       <i class="show fa fa-star"></i>`;
  //     } else if (star % 1 != 0 && star > 0 && star < 1) {
  //       markup = `
  //       <i class="show fa fa-star-half"></i>
  //       `;
  //     } else if (Number.isInteger(star) && star === 2) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>`;
  //     } else if (star % 1 != 0 && star > 1 && star < 2) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star-half"></i>
  //       `;
  //     } else if (Number.isInteger(star) && star === 3) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>`;
  //     } else if (star % 1 != 0 && star > 2 && star < 3) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star-half"></i>
  //       `;
  //     } else if (Number.isInteger(star) && star === 4) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>`;
  //     } else if (star % 1 != 0 && star > 3 && star < 4) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star-half"></i>
  //       `;
  //     } else if (Number.isInteger(star) && star === 5) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>`;
  //     } else if (star % 1 != 0 && star > 4 && star < 5) {
  //       markup = `
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star"></i>
  //       <i class="show fa fa-star-half"></i>
  //       `;
  //     }

  //     return markup;
  //   };

  //   calcMovieStars(movie);
  // }

  _generateMarkup(movie) {
    const markup = `
    <div class="movie">
          <img data-mov=${movie.id}
            class="movie__poster"
            src="${IMG_PATH}${movie.posterUrl}"
            alt="${movie.title}"
          />  
    </div>
  `;

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}
export default new ContentView();
