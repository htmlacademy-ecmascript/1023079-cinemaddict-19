import AbstractView from '../framework/view/abstract-view.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView extends AbstractView {

  #film;
  #handleOnCardClick;

  constructor(film, onCardClick) {
    super();
    this.#film = film;
    this.#handleOnCardClick = onCardClick;

    this.element.addEventListener('click', this.#handleOnCardClick);
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }
}
