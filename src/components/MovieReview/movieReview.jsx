import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=b2673ec2fc71df39b8b32567df19b6fa`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();

    return () => {
      // Cleanup
    };
  }, [movieId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold mb-6">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-center text-lg">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="p-4 border rounded-lg shadow-md">
              <p className="mb-2">{review.content}</p>
              <p className="text-sm text-gray-500">Author: {review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
