import {createElement} from '../render.js';
import { createFilmsContainerTemplate } from './films-container-view.template.js';

export default class FilmContainerView {
  getTemplate() {
    return createFilmsContainerTemplate();
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

  getFilmListContainer() {
    if(!this.listContainer) {
      this.listContainer = this.element.querySelector('.films-list__container');
    }

    return this.listContainer;
  }
}
