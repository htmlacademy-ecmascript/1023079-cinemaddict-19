import AbstractStatefulView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './popup-view.template.js';
import { COMMENTS_EMOTIONS } from '../consts.js';

const DEFAULT_COMMENT_EMOJI = COMMENTS_EMOTIONS[0];

export default class PopupView extends AbstractStatefulView {

  #comments;
  #film;
  #onCloseButtonClick;
  #onAddToWatchlistClick;
  #onAddToWatchedClick;
  #onAddToFavoriteClick;

  constructor (comments, film, onCloseButtonClick, onAddToWatchlistClick, onAddToWatchedClick, onAddToFavoriteClick) {
    super();

    this._setState(PopupView.parseFilmToState(film));

    this.#comments = comments;
    this.#film = film;
    this.#onCloseButtonClick = onCloseButtonClick;
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
    this.#onAddToWatchedClick = onAddToWatchedClick;
    this.#onAddToFavoriteClick = onAddToFavoriteClick;
    this.defaultCommentEmoji = DEFAULT_COMMENT_EMOJI;

    this._restoreHandlers();
  }

  get template() {
    return createPopupTemplate(this.#comments, this.#film);
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onAddToWatchlistClick);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onAddToWatchedClick);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onAddToFavoriteClick);
  }

  static parseFilmToState(film) {
    return {
      ...film,
      commentEmoji: DEFAULT_COMMENT_EMOJI
    };
  }

  static parseStateToFilm(state) {
    const film = {...state};

    delete film.commentEmoji;

    return film;
  }
}

