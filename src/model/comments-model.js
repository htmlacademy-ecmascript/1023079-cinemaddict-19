import { COMMENTS } from '../mocks/mock';
import { getRandomComments } from '../utils';

const COMMENTS_AMOUNT = 40;

export default class CommentsModel {

  comments = getRandomComments(COMMENTS, COMMENTS_AMOUNT);

  getComments() {
    return this.comments;
  }
}
