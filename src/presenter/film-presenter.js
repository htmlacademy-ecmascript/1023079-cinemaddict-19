import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #filmsModel;
  #commentModel;
  #films;
  #comments;

  #renderedFilmsCount = 0;

  constructor(filmsModel, commentsModel) {
    this.#filmsModel = filmsModel;
    this.#commentModel = commentsModel;
  }

  init() {
    this.#films = this.#filmsModel.films;
    this.#comments = this.#commentModel.comments;
  }
}
