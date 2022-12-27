import AbsractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView extends AbsractView {

  #comments;

  constructor (comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createPopupTemplate(this.#comments);
  }
}
