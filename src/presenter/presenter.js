import { render } from '../render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import UserProfileView from '../view/user-profile-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #container;
  #header;
  #body;
  #filmsModel;
  #commentModel;
  #films;
  #comments;

  constructor(mainContainer, headerContainer, bodyContainer, filmsModel, commentsModel) {
    this.#container = mainContainer;
    this.#header = headerContainer;
    this.#body = bodyContainer;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentsModel;
  }

  init() {
    const filmContainer = new FilmContainerView();
    this.#films = this.#filmsModel.getFilms();
    this.#comments = this.#commentModel.getComments();

    render(new UserProfileView(), this.#header);
    render(new FilterView(), this.#container);
    render(filmContainer, this.#container);
    const filmListContainer = filmContainer.getFilmListContainer();

    this.#films.forEach((film) => {
      film.commentsCount = this.#comments.filter((comment) => (comment.id === film.id)).length;
      render(new FilmCardView(film), filmListContainer);
    });

    render(new ShowMoreButtonView(), this.#container);

    const commentsForPopup = this.#comments.slice(0, 5);
    render(new PopupView(commentsForPopup), this.#body);
  }
}
