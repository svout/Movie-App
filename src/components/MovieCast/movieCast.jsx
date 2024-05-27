import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b2673ec2fc71df39b8b32567df19b6fa`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();

    return () => {
      // Cleanup
    };
  }, [movieId]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Cast</h3>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast.map((actor) => (
          <li className="flex flex-col items-center" key={actor.id}>
            {actor.profile_path ? null : (
              <p className="text-red-500 mb-2">There is no image available</p>
            )}
            {actor.profile_path && (
              <img
                className="w-36 h-36 object-cover rounded-full mb-2"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p className="text-center">{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
