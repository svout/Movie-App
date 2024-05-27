import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-black p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-white px-3 py-2 text-sm font-medium  transition-colors ${
                isActive ? "text-red-600" : "hover:text-red-500"
              }`
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-white px-3 py-2 rounded-md text-sm font-bold ${
                isActive ? "text-red-600" : "hover:text-red-700"
              }`
            }
            to="/movies"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
