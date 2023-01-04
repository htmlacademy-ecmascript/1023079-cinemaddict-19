import { render } from '../framework/render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import UserProfileView from '../view/user-profile-view.js';
import PopupView from '../view/popup-view.js';
import LoadingPageView from '../view/loading-page-view';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmPresenter {
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
    const loadingPage = new LoadingPageView();

    render(new FilterView(), this.#mainContainer);
    render(this.#filmContainerView, this.#mainContainer);

    if (!this.#films.length) {
      render(loadingPage, this.#filmListContainer);
    }
    else
    {
      render(new UserProfileView(), this.#headerContainer);
      this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
        this.#renderCard(film, this.#filmListContainer);
        this.#renderedFilmsCount++;
      });

      if(this.#renderedFilmsCount < this.#films.length) {
        this.#showMoreButton = new ShowMoreButtonView(this.#handleShowMoreButtonClick);
        render(this.#showMoreButton, this.#mainContainer);
      }
    }
  }

  #renderCard = (film, container) => {
    const filmCard = new FilmCardView(film, this.#handleOnCardClick);
    film.commentsCount = this.#comments.filter(
      (comment) => comment.id === film.id
    ).length;

    render(filmCard, container);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popup.element.remove();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleOnCloseButtonClick = () => {
    this.#popup.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleOnCardClick = () => {
    const commentsForPopup = this.#comments.slice(0, 5);
    this.#popup = new PopupView(commentsForPopup, this.#handleOnCloseButtonClick);

    render(this.#popup, this.#bodyContainer);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleShowMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
      this.#renderCard(film, this.#filmListContainer);
      this.#renderedFilmsCount++;

      if(this.#renderedFilmsCount === this.#films.length) {
        this.#showMoreButton.element.remove();
        this.#showMoreButton.removeElement();
      }
    });
  };
}
