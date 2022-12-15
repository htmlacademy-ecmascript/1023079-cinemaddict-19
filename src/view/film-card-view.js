import { createElement} from '../render.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView {
  constructor(film, relevantCommentsAmount = 0) {
    this.film = film;
    this.film.commentsCount = relevantCommentsAmount;
  }

  getTemplate() {
    return createNewFilmCardTemplate(this.film);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
