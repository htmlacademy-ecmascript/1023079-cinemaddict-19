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

  #showPopup = (popup) => {
    render(popup, this.#bodyContainer);
  };

  #hidePopup = (popup) => {
    popup.element.remove();
  };

  #addPopupAndListenersToCard = (film, container) => {
    const filmCard = new FilmCardView(film);
    film.commentsCount = this.#comments.filter(
      (comment) => comment.id === film.id
    ).length;
    const commentsForPopup = this.#comments.slice(0, 5);
    const popup = new PopupView(commentsForPopup);

    const filmCardLink = filmCard.element.querySelector('.film-card__link');
    const popupCloseButton = popup.element.querySelector('.film-details__close');

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#hidePopup(popup);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    filmCardLink.addEventListener('click', () => {
      this.#showPopup(popup);
      this.#bodyContainer.classList.add('.hide-overflow');
      document.addEventListener('keydown', escKeyDownHandler);
    });

    popupCloseButton.addEventListener('click', () => {
      this.#hidePopup(popup);
      this.#bodyContainer.classList.remove('.hide-overflow');
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(filmCard, container);
  };

  init() {
    const filmContainer = new FilmContainerView();
    this.#films = this.#filmsModel.films;
    this.#comments = this.#commentModel.comments;
    const showMoreButton = new ShowMoreButtonView();
    const loadingPage = new LoadingPageView();

    render(new FilterView(), this.#mainContainer);
    render(filmContainer, this.#mainContainer);
    const filmListContainer = filmContainer.filmListContainer;

    if (!this.#films.length) {
      render(loadingPage, filmListContainer);
    }
    else
    {
      render(new UserProfileView(), this.#headerContainer);
      this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
        this.#addPopupAndListenersToCard(film, filmListContainer);
        this.#renderedFilmsCount++;
      });

      if(this.#renderedFilmsCount < this.#films.length) {
        render(showMoreButton, this.#mainContainer);
      }

      showMoreButton.element.addEventListener('click', () => {
        this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
          this.#addPopupAndListenersToCard(film, filmListContainer);
          this.#renderedFilmsCount++;

          if(this.#renderedFilmsCount === this.#films.length) {
            showMoreButton.element.remove();
          }
        });
      });
    }
  }
}
