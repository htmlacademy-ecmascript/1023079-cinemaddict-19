import FilmPresenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './view/comments-model.js';

const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const body = document.querySelector('body');

const filmsModel = new FilmsModel;
const commentsModel = new CommentsModel;

const presenter = new FilmPresenter(mainContainer, header, body, filmsModel, commentsModel);

presenter.init();

