import MainPresenter from './presenter/main-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { COMMENTS } from './mocks/mock.js';
import CommentsModel from './model/comments-model.js';

const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const commentsModel = new CommentsModel(COMMENTS);
const filmsModel = new FilmsModel();

const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(mainContainer, header, body, filmsModel, commentsModel, filterModel);

const filterPresenter = new FilterPresenter({
  filterContainer: mainContainer,
  filterModel,
  filmsModel
});

filterPresenter.init();
mainPresenter.init();
