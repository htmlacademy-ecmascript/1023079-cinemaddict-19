import MainPresenter from './presenter/main-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './films-api.js';
import CommentsApiService from './comments-api.js';

const AUTHORIZATION = 'Basic SPMsk28493';
const END_POINT = 'https://19.ecmascript.htmlacademy.pro/cinemaddict/';


const siteMain = document.querySelector('.main');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  filmsContainer: siteMain,
  filmsModel,
  commentsModel,
  filterModel
});

mainPresenter.init();
filmsModel.init();
