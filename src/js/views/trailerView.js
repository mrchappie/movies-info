import searchView from '../views/searchView.js';
import { SEARCH_TRAILER_1 } from './config.js';
import { SEARCH_TRAILER_2 } from './config.js';
import * as model from '../model.js';
import * as config from './config.js';

class TrailerView {
  _parentElement = document.querySelector('.content');
  _aboutMovie = document.querySelector('.about__movie');
  _movieInformation = document.querySelector('.information');
  _query = searchView.getQuery();
  _movieID;
  //   _tempMovieIDArr;
  _typeOfSearch;

  addHandlerClickedMovie(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const mov = e.target.closest('.movie__poster');

      if (!mov) return;

      if (model.state.movie.movieBySearch.results.length != 0) {
        this._typeOfSearch = 'search';
      } else if (model.state.movie.movieByMostPopular.results.length != 0) {
        this._typeOfSearch = 'popular';
      }

      handler(mov, this._typeOfSearch);
    });
  }

  _searchForTrailers(el) {
    if (el === 'search') {
      model.getTrailerBySearch(
        `${SEARCH_TRAILER_1}${this._movieID}${SEARCH_TRAILER_2}`
      );
    } else if (el === 'popular') {
      model.getTrailerByMostPopular(
        `${SEARCH_TRAILER_1}${this._movieID}${SEARCH_TRAILER_2}`
      );
    }
  }

  _filterTrailersArr(arr, type) {
    const trailers = arr;

    if (type === 'search') {
      model.state.movie.movieBySearch.trailer = trailers.filter(trailer => {
        if (trailer.type === 'Trailer') return trailer;
        // if (trailer.name === 'Official Trailer') return trailer;
        // if (trailer.name === 'Final Trailer') return trailer;
        // if (trailer.name === 'New Trailer') return trailer;
      });
      model.state.movie.trailerData.search.push(
        model.state.movie.movieBySearch.trailer
      );
    } else if (type === 'popular') {
      model.state.movie.movieByMostPopular.trailer = trailers.filter(
        trailer => {
          if (trailer.type === 'Trailer') return trailer;
          // if (trailer.name === 'Official Trailer') return trailer;
          // if (trailer.name === 'Final Trailer') return trailer;
          // if (trailer.name === 'New Trailer') return trailer;
        }
      );
      model.state.movie.trailerData.popular.push(
        model.state.movie.movieByMostPopular.trailer
      );
    }

    console.log(this._movieID);
    console.log(model.state.movie.movieByMostPopular.trailer);
  }

  _filterMoviesArrForID(arr, id, type) {
    const results = arr;
    let idx = id;
    const temp = results.filter(res => res.id === +idx);

    if (type === 'search') model.state.movie.trailerData.search = temp;
    else if (type === 'popular') model.state.movie.trailerData.popular = temp;

    console.log(idx);
    console.log(temp);
    console.log(model.state.movie.trailerData.search);
  }

  renderTrailer(arr1, arr2) {
    let info = arr1;
    let trailer = arr2;

    let data = {
      movie: {
        ...info[0],
      },
      trailer: {
        ...trailer[0],
      },
    };

    this._pushTrailerMarkup(data);
    console.log(info);
    console.log(trailer);
    console.log(data);
  }

  _clear() {
    // this._aboutMovie.innerHTML = '';
    this._movieInformation.innerHTML = '';
    this._movieInformation.style.backgroundImage = '';
  }

  _pushTrailerMarkup(trailer) {
    // this._aboutMovie.style.backgroundImage = `${config.IMG_PATH}${trailer.posterUrl}`;
    this._movieInformation.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
    url(${config.IMG_PATH}${trailer.movie.wallpaper})`;

    const markup = `
    <div class="about">
      <span class="title">${trailer.movie.title}</span>   
        <span class="year">
          <span>${trailer.movie.releaseDate} | </span>   
            <span>${trailer.movie.language} | </span>   
              <span>${trailer.movie.voteAverage}</span> 
        </span>  
              <span class="description">
              ${trailer.movie.description}
              </span>   
    </div>

    <div class="trailer-box">
        <div class="trailer">
            <iframe id="trailer" class="trailer" width="100%" height="100%" src="https://www.youtube.com/embed/${trailer.trailer.key}" allowfullscreen>
              </iframe>
        </div>
    </div>`;

    this._movieInformation.insertAdjacentHTML('afterbegin', markup);
  }

  //   _searchForTrailers(e) {
  //     try {
  //       const id = e.dataset.mov;

  //       if (query) {
  //         console.log(query);

  //         model.getTrailerBySearch(
  //           `${config.SEARCH_TRAILER_1}${id}${config.SEARCH_TRAILER_2}`
  //         );

  //         setTimeout(() => {
  //           if (model.state.movie.movieBySearch.trailers.length !== 0) {
  //             contentView.renderTrailer(model.state.movie.movieBySearch.trailers);
  //           }
  //         }, 500);
  //       } else if (!query) {
  //         console.log('no query');

  //         model.getTrailerByMostPopular(
  //           `${config.SEARCH_TRAILER_1}${id}${config.SEARCH_TRAILER_2}`
  //         );

  //         setTimeout(() => {
  //           if (model.state.movie.movieByMostPopular.trailers.length !== 0) {
  //             contentView.renderTrailer(
  //               model.state.movie.movieByMostPopular.trailers
  //             );
  //           }
  //         }, 500);
  //       }
  //       contentView._movieAbout.style.display = 'flex';
  //       contentView._parentElement.style.display = 'none';
  //       searchView._parentEl.style.display = 'none';
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
}
export default new TrailerView();
