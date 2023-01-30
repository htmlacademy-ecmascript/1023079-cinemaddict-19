import dayjs from 'dayjs';
import { COMMENTS_EMOTIONS } from '../consts.js';
import { DATE_FORMAT } from '../consts.js';
import { getRandomArrayElement } from '../utils/utils.js';
import { COMMENT_COUNT } from '../consts.js';
import { getRandomInt } from '../utils/utils.js';

export const mockFilms = [

  {
    name: 'Made for each other',
    poster: './images/posters/made-for-each-other.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.0',
    date: '1970',
    duration: '1h 30m',
    genre: 'comedy',
    id: 1,
    isAdded: false,
    isWatched: false,
    isFavorite: false
  },

  {
    name: 'Popeye meets sinbad',
    poster: './images/posters/popeye-meets-sinbad.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1960',
    duration: '1h 30m',
    genre: 'comedy',
    id: 2,
    isAdded: false,
    isWatched: false,
    isFavorite: false
  },

  {
    name: 'Sagebrush trail',
    poster: './images/posters/sagebrush-trail.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.5',
    date: '1990',
    duration: '1h 30m',
    genre: 'comedy',
    id: 3,
    isAdded: false,
    isWatched: false,
    isFavorite: false
  },

  {
    name: 'The dance of life',
    poster: './images/posters/the-dance-of-life.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.9',
    date: '1989',
    duration: '1h 30m',
    genre: 'comedy',
    id: 4,
    isAdded: false,
    isWatched: false,
    isFavorite: false
  },

  {
    name: 'The great flamarion',
    poster: './images/posters/the-great-flamarion.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.4',
    date: '1992',
    duration: '1h 30m',
    genre: 'comedy',
    id: 5,
    isAdded: false,
    isWatched: false,
    isFavorite: false
  }
];

const createComment = () => ({
  id: getRandomInt(1,5),
  author: 'some persone',
  comment: 'some opinion',
  commentDate: `${dayjs().format(DATE_FORMAT)}`,
  emotion: getRandomArrayElement(COMMENTS_EMOTIONS),
});

export const COMMENTS = Array.from({ length:COMMENT_COUNT }, createComment);

export const POPUP = {
  title: 'Mission impossible',
  titleOrigin: 'Mission impossible',
  poster: './images/posters/the-man-with-the-golden-arm.jpg',
  age: '7+',
  rating: '7.0',
  director: 'Ben Shaw',
  writers: 'Sandra Bullock',
  actors: 'Tom Cruse',
  date: '2000',
  duration: '1h 40m',
  country: 'USA',
  genre: 'action',
  description: 'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless.',
};


