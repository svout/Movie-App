import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader/loader";
import { Suspense } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3M2VjMmZjNzFkZjM5YjhiMzI1NjdkZjE5YjZmYSIsInN1YiI6IjY2MWQyYzEzY2I2ZGI1MDE2MjA5NTE2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q05H961gS_ywJC0_FNkMA5olb2VoMVIDlpDzDEJ73nA",
          },
        };
        const res = await axios(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setResponse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className="container mx-auto p-4">
      <Link
        to={location.state ? location.state.from.pathname : "/movies"}
        state={location.state}
        className="block mb-4 text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-600"
      >
        Go back
      </Link>
      <Suspense fallback={<Loader />}>
        {isLoading && <Loader />}
        {response === null ? (
          <p>Error...</p>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Movie Details</h2>
              {response.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${response.poster_path}`}
                  alt=""
                  className="mb-4"
                />
              ) : (
                <p>There is no image available</p>
              )}
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-xl font-semibold">{response.title}</h3>
              <p className="mb-2">User Score: {response.vote_average}</p>
              <p className="mb-2">{response.overview}</p>
              <p className="mb-2">
                Genres:{" "}
                {response.genres &&
                  response.genres.map((genre) => genre.name).join(", ")}
              </p>
              <Link
                to={`/movies/${movieId}/cast`}
                className="text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-600 mr-4"
              >
                Cast
              </Link>

              <Link
                to={`/movies/${movieId}/reviews`}
                className="text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-600"
              >
                Reviews
              </Link>
            </div>
          </div>
        )}

        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
