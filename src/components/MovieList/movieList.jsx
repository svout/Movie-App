import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

const MovieList = ({ loading, error, movies }) => {
  const location = useLocation();
  const [focusMovieId, setFocusMovieId] = useState(null);
  const listRef = useRef(null);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={`p-4 border rounded-lg transition-shadow ${
                focusMovieId === movie.id ? "shadow-lg" : "shadow"
              }`}
              onMouseEnter={() => setFocusMovieId(movie.id)}
              onMouseLeave={() => setFocusMovieId(null)}
            >
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location.pathname },
                }}
                className="flex flex-col items-start"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="mb-2"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
                <p className="text-lg font-semibold">{movie.title}</p>
                <p className="text-sm text-gray-500">{movie.release_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl">No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
