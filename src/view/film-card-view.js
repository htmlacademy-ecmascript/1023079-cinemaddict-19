import AbstractView from '../framework/view/abstract-view.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView extends AbstractView {

  #film;
  #onCardClick;
  #onAddToWatchlistClick;
  #onAddToWatchedClick;
  #onAddToFavoriteClick;

  constructor(film, onCardClick, onAddToWatchlistClick, onAddToWatchedClick, onAddToFavoriteClick) {
    super();
    this.#film = film;
    this.#onCardClick = onCardClick;
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
    this.#onAddToWatchedClick = onAddToWatchedClick;
    this.#onAddToFavoriteClick = onAddToFavoriteClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#cardClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#onAddToWatchlistClick);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#onAddToWatchedClick);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#onAddToFavoriteClick);
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }

  #cardClickHandler = () => {

    this.#onCardClick();
  };
}
