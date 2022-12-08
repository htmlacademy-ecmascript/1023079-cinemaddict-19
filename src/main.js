import FilmPresenter from './presenter/presenter.js';

const mainContainer = document.querySelector('.main');
const presenter = new FilmPresenter(mainContainer);

presenter.init();
