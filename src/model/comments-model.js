import { COMMENTS } from '../mocks/mock';
import { getRandomComments } from '../utils/utils';

const COMMENTS_AMOUNT = 40;

export default class CommentsModel {

  #comments = getRandomComments(COMMENTS, COMMENTS_AMOUNT);

  get comments() {
    return this.#comments;
  }
}
