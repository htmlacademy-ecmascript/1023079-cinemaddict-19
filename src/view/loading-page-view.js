import AbstractView from '../framework/view/abstract-view.js';
import { createLoadingPageTemplate } from './loading-page-view.template.js';

export default class LoadingPageView extends AbstractView {
  #filterType;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createLoadingPageTemplate(this.#filterType);
  }
}
