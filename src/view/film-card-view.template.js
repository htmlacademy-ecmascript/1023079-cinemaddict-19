export const createNewFilmCardTemplate = (film) => {
  const {name, poster, description, date, duration, genre, rating, commentsCount, isAdded, isWatched, isFavorite} = film;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${date}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <span class="film-card__comments">${commentsCount}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isAdded ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};
