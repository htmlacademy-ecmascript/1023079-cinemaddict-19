import { getRandomArrayElement } from '../render.js';

export const mockFilms = [

  {
    name: 'Made for each other',
    poster: './images/posters/made-for-each-other.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1980',
    duration: '1h 30m',
    genre: 'comedy',
    commentsCount: '5'
  },

  {
    name: 'Popeye meets sinbad',
    poster: './images/posters/popeye-meets-sinbad.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1980',
    duration: '1h 30m',
    genre: 'comedy',
    commentsCount: '5'
  },

  {
    name: 'Sagebrush trail',
    poster: './images/posters/sagebrush-trail.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1980',
    duration: '1h 30m',
    genre: 'comedy',
    commentsCount: '5'
  },

  {
    name: 'The dance of life',
    poster: './images/posters/the-dance-of-life.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1980',
    duration: '1h 30m',
    genre: 'comedy',
    commentsCount: '5'
  },

  {
    name: 'The great flamarion',
    poster: './images/posters/the-great-flamarion.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    rating: '8.2',
    date: '1980',
    duration: '1h 30m',
    genre: 'comedy',
    commentsCount: '5'
  }
];


export const COMMENTS = [
  {
    emoji: 'smile',
    text: 'Interesting setting and a good cast',
    author: 'VKDKDPAD',
    date: '2 days ago'
  },
  {
    emoji: 'sleeping',
    text: 'Booooooooooring',
    author: 'vvvopdwa',
    date: '1 days ago'
  },
  {
    emoji: 'angry',
    text: 'Very very old. Meh',
    author: 'pkglsen',
    date: '5 days ago'
  },
  {
    emoji: 'smile',
    text: 'Almost two hours? Seriously?',
    author: 'chowddk',
    date: '3 days ago'
  },
];

export const getRandomFilm = () => getRandomArrayElement(mockFilms);
