import {createElement} from '../render.js';
import { createFilmsContainerTemplate } from './films-container-view.template.js';

export default class FilmContainerView {
  #element;
  #listContainer;

  get template() {
    return createFilmsContainerTemplate();
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

  get filmListContainer() {
    if(!this.#listContainer) {
      this.#listContainer = this.#element.querySelector('.films-list__container');
    }

    return this.#listContainer;
  }
}
