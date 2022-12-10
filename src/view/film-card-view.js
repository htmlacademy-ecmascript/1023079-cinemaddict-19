import { createElement} from '../render.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView {
  getTemplate() {
    return createNewFilmCardTemplate();
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
