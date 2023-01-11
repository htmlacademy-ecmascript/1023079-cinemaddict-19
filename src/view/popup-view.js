import AbstractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView extends AbstractView {

  #comments;
  #film;
  #onCloseButtonClick;
  #onAddToWatchlistClick;
  #onAddToWatchedClick;
  #onAddToFavoriteClick;

  constructor (comments, film, onCloseButtonClick, onAddToWatchlistClick, onAddToWatchedClick, onAddToFavoriteClick) {
    super();
    this.#comments = comments;
    this.#film = film;
    this.#onCloseButtonClick = onCloseButtonClick;
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
    this.#onAddToWatchedClick = onAddToWatchedClick;
    this.#onAddToFavoriteClick = onAddToFavoriteClick;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onAddToWatchlistClick);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onAddToWatchedClick);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onAddToFavoriteClick);
  }

  get template() {
    return createPopupTemplate(this.#comments, this.#film);
  }
}

