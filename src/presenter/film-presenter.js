import { remove, render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {UserAction, UpdateType} from '../consts.js';


export default class FilmPresenter {
  #filmListContainer;
  #bodyContainer;
  #filmCard;
  #film;
  #popup;
  #comments;
  #handlePopupOpen;
  #handlePopupClose;
  #handleDataChange;

  constructor(filmListContainer, bodyContainer, onPopupOpen, onPopupClose, onDataChange) {
    this.#filmListContainer = filmListContainer;
    this.#bodyContainer = bodyContainer;
    this.#handlePopupOpen = onPopupOpen;
    this.#handlePopupClose = onPopupClose;
    this.#handleDataChange = onDataChange;
  }

  init(film, comments) {
    this.#film = film;
    this.#comments = comments;
    this.#film.commentsCount = this.#comments.filter(
      (comment) => comment.id === film.id
    ).length;

    this.#filmCard = new FilmCardView(this.#film, this.#onCardClick, this.#onAddToWatchlistClick, this.#onAddToWatchedClick, this.#onAddToFavoriteClick);

    const commentsForPopup = this.#comments.slice(0, 5);
    this.#popup = new PopupView(commentsForPopup, this.#film, this.#onCloseButtonClick, this.#onAddToWatchlistClick, this.#onAddToWatchedClick, this.#onAddToFavoriteClick, this.#handleDeleteClick, this.#handleAddComment);

    render(this.#filmCard, this.#filmListContainer);
  }

  destroy = () => {
    remove(this.#filmCard);
  };

  closePopup = () => {
    this.#popup.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handlePopupClose();
  };

  #onCardClick = () => {
    if (this.#bodyContainer.contains(this.#popup.element)) {
      return;
    }

    render(this.#popup, this.#bodyContainer);
    this.#handlePopupOpen(this);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onAddToWatchlistClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {
        ...this.#film,
        isAdded: !this.#film.isAdded
      },
    );

    this.#filmCard.element.querySelector('.film-card__controls-item--add-to-watchlist').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watchlist').classList.toggle('film-details__control-button--active');
  };

  #onAddToWatchedClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {
        ...this.#film,
        isWatched: !this.#film.isWatched
      },
    );

    // this.#film.isWatched = !this.#film.isWatched;

    this.#filmCard.element.querySelector('.film-card__controls-item--mark-as-watched').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watched').classList.toggle('film-details__control-button--active');
  };

  #onAddToFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {
        ...this.#film,
        isFavorite: !this.#film.isFavorite
      },
    );

    // this.#film.isFavorite = !this.#film.isFavorite;

    this.#filmCard.element.querySelector('.film-card__controls-item--favorite').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--favorite').classList.toggle('film-details__control-button--active');
  };

  #onCloseButtonClick = () => {
    this.closePopup();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popup.reset(this.#film);
      this.closePopup();
    }
  };

  #handleDeleteClick = (id) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      id
    );
  };

  #handleAddComment = (data) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data
    );
  };
}
