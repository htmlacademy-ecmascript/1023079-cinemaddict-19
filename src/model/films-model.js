import { getRandomFilms } from '../utils.js';
import { mockFilms } from '../mocks/mock.js';

const FILM_COUNT = 17;

export default class FilmsModel {
  #films = getRandomFilms(mockFilms, FILM_COUNT);

  get films() {
    return this.#films;
  }
}
