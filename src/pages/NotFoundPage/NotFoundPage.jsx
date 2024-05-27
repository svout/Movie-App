import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-lg">
        Oops! The page you are looking for does not exist.{" "}
        <Link
          to="/"
          className="text-blue-500 hover:underline focus:outline-none focus:ring focus:ring-blue-400"
        >
          Go back to Home
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
