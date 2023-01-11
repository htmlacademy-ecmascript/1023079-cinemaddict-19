import { remove, render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #filmListContainer;
  #bodyContainer;
  #filmCard;
  #film;
  #popup = null;
  #comments;

  constructor(filmListContainer, bodyContainer, comments) {
    this.#filmListContainer = filmListContainer;
    this.#bodyContainer = bodyContainer;
    this.#comments = comments;
  }

  init(film) {
    this.#film = film;
    this.#film.commentsCount = this.#comments.filter(
      (comment) => comment.id === film.id
    ).length;

    this.#filmCard = new FilmCardView(this.#film, this.#onCardClick, this.#onAddToWatchlistClick, this.#onAddToWatchedClick, this.#onAddToFavoriteClick);

    const commentsForPopup = this.#comments.slice(0, 5);
    this.#popup = new PopupView(commentsForPopup, this.#film, this.#onCloseButtonClick, this.#onAddToWatchlistClick, this.#onAddToWatchedClick, this.#onAddToFavoriteClick);

    render(this.#filmCard, this.#filmListContainer);
  }

  #onCardClick = () => {
    if (this.#bodyContainer.contains(this.#popup.element)) {
      remove(this.#popup.element);
    }

    render(this.#popup, this.#bodyContainer);
    console.log(this.#film.poster);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onAddToWatchlistClick = () => {
    if (!this.#film.isAdded) {
      this.#film.isAdded = !this.#film.isAdded;
    } else {
      this.#film.isAdded = !this.#film.isAdded;
    }

    this.#filmCard.element.querySelector('.film-card__controls-item--add-to-watchlist').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watchlist').classList.toggle('film-details__control-button--active');
  };

  #onAddToWatchedClick = () => {
    if (!this.#film.isWatched) {
      this.#film.isWatched = !this.#film.isWatched;
    } else {
      this.#film.isWatched = !this.#film.isWatched;
    }

    this.#filmCard.element.querySelector('.film-card__controls-item--mark-as-watched').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watched').classList.toggle('film-details__control-button--active');
  };

  #onAddToFavoriteClick = () => {
    if (!this.#film.isFavorite) {
      this.#film.isFavorite = !this.#film.isFavorite;
    } else {
      this.#film.isFavorite = !this.#film.isFavorite;
    }

    this.#filmCard.element.querySelector('.film-card__controls-item--favorite').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--favorite').classList.toggle('film-details__control-button--active');
  };

  #onCloseButtonClick = () => {
    this.#popup.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popup.element.remove();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
