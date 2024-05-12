import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import { useState } from "react";
import { useRef } from "react";

const MovieList = ({ loading, error, movies }) => {
  const location = useLocation();
  const [focusMovieId, setFocusMovieId] = useState(null);
  const listRef = useRef(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.container}>
      {movies.length > 0 ? (
        <ul className={css.list}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={focusMovieId === movie.id ? css.focusItem : css.listItem}
              onMouseEnter={() => setFocusMovieId(movie.id)}
              onMouseLeave={() => setFocusMovieId(null)}
            >
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location.pathname },
                }}
              >
                <div className={css.titleContainer}>
                  <p className={css.title}>{movie.title}</p>
                  <p className={css.releaseDate}>{movie.release_date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
