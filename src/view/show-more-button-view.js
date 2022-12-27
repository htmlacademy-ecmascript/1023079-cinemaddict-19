import AbsractView from '../framework/view/abstract-view.js';
import { createShowMoreButtonTemplate } from './show-more-button.template.js';

export default class ShowMoreButtonView extends AbsractView {

  get template() {
    return createShowMoreButtonTemplate();
  }
}
