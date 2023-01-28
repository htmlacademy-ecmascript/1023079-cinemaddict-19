import { render } from '../framework/render.js';
import { remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import LoadingPageView from '../view/loading-page-view';
import FilmPresenter from './film-presenter.js';
import { SortType } from '../framework/render.js';
import {UpdateType, UserAction} from '../consts.js';
import FilterView from '../view/filter-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainContainer;
  #headerContainer;
  #bodyContainer;
  #filmsModel;
  #commentModel;
  #sortComponent;
  #showMoreButton;
  #filmContainerView = new FilmContainerView();
  #userProfile = new UserProfileView();
  #filmListContainer = this.#filmContainerView.filmListContainer;
  #filmPresenters = [];
  #currentSortType = SortType.DEFAULT;
  #filterComponent;

  #renderedFilmsCount = 0;
  /** @type {FilmPresenter | null} */
  #openedFilmPresenter = null;

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
    this.#sortComponent = new SortView(this.#onSortByDateClick, this.#onSortByRatingClick, this.#onSortByDefaultClick);
    this.#filterComponent = new FilterView();
    this.#showMoreButton = new ShowMoreButtonView(this.#onShowMoreButtonClick);

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilmContainer();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#filmsModel.deleteFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmContainer();
        this.#renderFilmContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmContainer({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderFilmContainer();
        break;
    }
  };

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort((a,b) => b.date - a.date);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort((a,b) => b.rating - a.rating);
      case SortType.DEFAULT:
        return this.#filmsModel.films;
    }

    return this.#filmsModel.films;
  }

  #renderFilmContainer = () => {
    this.#renderUserProfile();
    this.#renderFilter();
    this.#renderSort();
    render(this.#filmContainerView, this.#mainContainer);

    if (!this.films.length) {
      this.#renderLoading();
    } else {
      this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

      if (this.#renderedFilmsCount < this.films.length) {
        this.#renderShowMoreButton();
      }
    }
  };

  #clearFilmContainer({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this.films.length;

    this.#clearFilmList();

    remove(this.#sortComponent);
    remove(this.#showMoreButton);

    if (resetRenderedFilmCount) {
      this.#renderedFilmsCount = 0;
    } else {
      this.#renderedFilmsCount = Math.min(filmCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderLoading = () => {
    render(new LoadingPageView(), this.#filmListContainer);
  };

  #renderUserProfile = () => {
    render(this.#userProfile, this.#headerContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer);
    this.#sortComponent._restoreHandlers();
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#mainContainer);
  };

  #renderCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#bodyContainer, this.#onPopupOpen, this.#onPopupClose, this.#handleViewAction);
    filmPresenter.init(film, this.#commentModel.comments);

    this.#filmPresenters.push(filmPresenter);
  };

  #renderCards = (from, to) => {
    this.films.slice(from, to).forEach((film) => {
      this.#renderCard(film, this.#filmListContainer);
      this.#renderedFilmsCount++;
    });
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#mainContainer);
    this.#showMoreButton._restoreHandlers();
  };


  #clearFilmList = () => {
    this.#filmPresenters.forEach((filmPresenter) => filmPresenter.destroy());
  };

  /**
   * @param {FilmPresenter} filmPresenter
   */
  #onPopupOpen = (filmPresenter) => {
    if (this.#openedFilmPresenter === filmPresenter) {
      return;
    }

    if (this.#openedFilmPresenter) {
      this.#openedFilmPresenter.closePopup();
    }
    this.#openedFilmPresenter = filmPresenter;
  };

  #onPopupClose = () => {
    this.#openedFilmPresenter = null;
  };

  #onShowMoreButtonClick = () => {
    this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    if (this.#renderedFilmsCount === this.films.length) {
      remove(this.#showMoreButton);
    }
  };

  #onSortByDateClick = () => {
    if (this.#currentSortType === SortType.DATE) {
      return;
    }
    this.#currentSortType = SortType.DATE;
    this.#clearFilmContainer({resetRenderedFilmCount: true});
    this.#renderFilmContainer();

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.films.length) {
      this.#renderShowMoreButton();
    }
  };

  #onSortByRatingClick = () => {
    if (this.#currentSortType === SortType.RATING) {
      return;
    }
    this.#currentSortType = SortType.RATING;
    this.#clearFilmContainer({resetRenderedFilmCount: true});
    this.#renderFilmContainer();

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.films.length) {
      this.#renderShowMoreButton();
    }
  };

  #onSortByDefaultClick = () => {
    if (this.#currentSortType === SortType.DEFAULT) {
      return;
    }
    this.#currentSortType = SortType.DEFAULT;
    this.#clearFilmContainer({resetRenderedFilmCount: true});
    this.#renderFilmContainer();

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.films.length) {
      this.#renderShowMoreButton();
    }
  };
}
