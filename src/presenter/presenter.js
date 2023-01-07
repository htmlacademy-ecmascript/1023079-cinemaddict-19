import { render } from '../framework/render.js';
import { remove } from '../framework/render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import LoadingPageView from '../view/loading-page-view';
import FilmPresenter from './film-presenter.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainContainer;
  #headerContainer;
  #bodyContainer;
  #filmsModel;
  #commentModel;
  #films;
  #comments;
  #showMoreButton;
  #popup;
  #filmContainerView = new FilmContainerView();
  #filmListContainer = this.#filmContainerView.filmListContainer;

  #renderedFilmsCount = 0;

  constructor(
    mainContainer,
    headerContainer,
    bodyContainer,
    filmsModel,
    commentsModel
  ) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#bodyContainer = bodyContainer;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentsModel;
  }

  init() {
    this.#films = this.#filmsModel.films;
    this.#comments = this.#commentModel.comments;

    this.#renderFilter();
    this.#renderFilmContainer();

    if (!this.#films.length) {
      this.#renderLoading();
    }
    else
    {
      this.#renderUserProfile();
      this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

      if(this.#renderedFilmsCount < this.#films.length) {
        this.#showMoreButton = new ShowMoreButtonView(this.#onShowMoreButtonClick);
        render(this.#showMoreButton, this.#mainContainer);
      }
    }
  }

  #renderFilmContainer = () => {
    render(this.#filmContainerView, this.#mainContainer);
  };

  #renderLoading = () => {
    render(new LoadingPageView(), this.#filmListContainer);
  };

  #renderUserProfile = () => {
    render(new UserProfileView(), this.#headerContainer);
  };

  #renderFilter = () => {
    render(new FilterView(), this.#mainContainer);
  };

  #renderCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#bodyContainer, this.#commentModel.comments);
    filmPresenter.init(film);
  };

  #renderCards = (from, to) => {
    this.#films.slice(from, to).forEach((film) => {
      this.#renderCard(film, this.#filmListContainer);
      this.#renderedFilmsCount++;
    });
  };

  #onShowMoreButtonClick = () => {
    this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    if(this.#renderedFilmsCount === this.#films.length) {
      remove(this.#showMoreButton);
    }
  };
}
