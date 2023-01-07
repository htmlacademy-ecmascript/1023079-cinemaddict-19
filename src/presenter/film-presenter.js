import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #filmListContainer;
  #bodyContainer;
  #filmCard;
  #film;
  #popup;
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
    this.#filmCard = new FilmCardView(this.#film, this.#onCardClick);

    render(this.#filmCard, this.#filmListContainer);
  }

  #onCardClick = () => {
    const commentsForPopup = this.#comments.slice(0, 5);
    this.#popup = new PopupView(commentsForPopup, this.#onCloseButtonClick);

    render(this.#popup, this.#bodyContainer);

    document.addEventListener('keydown', this.#escKeyDownHandler);
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
