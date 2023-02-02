import AbstractView from '../framework/view/abstract-view.js';
import { createFilmCardTemplate } from './film-card-view.template.js';

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleClick = null;
  #handleControlButtonClick = null;

  constructor({film, onClick, onControlBtnClick}) {
    super();
    this.#film = film;

    this.#handleClick = onClick;
    this.#handleControlButtonClick = onControlBtnClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlButtonsClickHandler);

  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #clickHandler = () => {
    this.#handleClick();
  };

  #controlButtonsClickHandler = (evt) => {
    if (evt.target.classList.contains('film-card__controls-item')) {
      this.#handleControlButtonClick({
        ...this.#film,
        comments: this.#film.comments.map((comment) => comment.id),
        userDetails: {
          ...this.#film.userDetails,
          [evt.target.dataset.userDetail]: !this.#film.userDetails[evt.target.dataset.userDetail],
        }
      });
    }
  };

}
