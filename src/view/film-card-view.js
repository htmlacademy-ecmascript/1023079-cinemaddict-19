import AbstractView from '../framework/view/abstract-view.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';
import { FilterType, UpdateType} from '../consts.js';


export default class FilmCardView extends AbstractView {

  #film;
  #onCardClick;
  #currentFilterType;
  #handleControlsClick;

  constructor(film, onCardClick, onControlsClick, currentFilterType) {
    super();
    this.#film = film;
    this.#onCardClick = onCardClick;
    this.#handleControlsClick = onControlsClick;
    this.#currentFilterType = currentFilterType;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#cardClickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlsClickHandler);
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }

  #cardClickHandler = () => {
    this.#onCardClick();
  };

  #controlsClickHandler = (evt) => {
    let updatedDetails = this.#film.userDetails;
    let updateType;

    switch (evt.target.dataset.control) {
      case FilterType.WATCHLIST: {
        updatedDetails = { ...updatedDetails, watchlist: !this.#film.userDetails.watchlist };
        updateType = this.#currentFilterType === FilterType.WATCHLIST ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
      case FilterType.HISTORY: {
        updatedDetails = { ...updatedDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched };
        updateType = this.#currentFilterType === FilterType.HISTORY ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
      case FilterType.FAVORITE: {
        updatedDetails = { ...updatedDetails, favorite: !this.#film.userDetails.favorite };
        updateType = this.#currentFilterType === FilterType.FAVORITE ? UpdateType.MINOR : UpdateType.PATCH;
        break;
      }
    }

    this.#handleControlsClick(updatedDetails, updateType);
  };
}
