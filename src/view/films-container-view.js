import AbstractView from '../framework/view/abstract-view.js';
import { createFilmsContainerTemplate } from './films-container-view.template.js';

export default class FilmContainerView extends AbstractView {
  #listContainer;

  get template() {
    return createFilmsContainerTemplate();
  }

  get filmListContainer() {
    if(!this.#listContainer) {
      this.#listContainer = this.element.querySelector('.films-list__container');
    }

    return this.#listContainer;
  }
}
