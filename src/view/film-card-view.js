import { createElement} from '../render.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView {
  #element;
  #film;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
