import { POPUP } from '../mocks/mock';
import { COMMENTS_EMOTIONS } from '../consts';
// import he from 'he';

const {
  titleOrigin,
  age,
  director,
  writers,
  actors,
  country
} = POPUP;

const createCommentsTemplateForPopup = (comments) => comments.map((comment) =>
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
 </li>
 `)
  .join('');

const createAddCommentFormTemplate = (state) => (`
    <div class="film-details__add-emoji-label">
    <img src="./images/emoji/${state.emotion}.png" width="30" height="30" alt="emoji">
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
        name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
      ${COMMENTS_EMOTIONS.map((emotion) => `
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}"
          value="${emotion}" ${emotion === state.emotion ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>
      `).join('')}
    </div>
`);

export const createPopupTemplate = (film, comments, state) => {

  const watchlist = film.isAdded;
  const alreadyWatched = film.isWatched;
  const favorite = film.isFavorite;

  const activeWatchlistClassName = watchlist ? 'film-details__control-button--active' : '';
  const activeAsWatchedClassName = alreadyWatched ? 'film-details__control-button--active' : '';
  const activeFavoriteClassName = favorite ? 'film-details__control-button--active' : '';

  return (`
  <section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${state.poster} alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${state.name}</h3>
              <p class="film-details__title-original">${titleOrigin}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${state.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director} Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${writers}</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${state.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${state.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${state.genre}</span>
                </td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${state.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${activeWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${activeAsWatchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${activeFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentsTemplateForPopup(comments)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          ${createAddCommentFormTemplate(state)}
        </form>
      </section>
    </div>
  </div>
</section>
`);
};
