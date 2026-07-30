import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-black dark:text-white">
            MyApp
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/charts"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Charts
          </Link>
          <Link
            to="/testimonials"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Testimonials
          </Link>
          <Link
            to="/marquee"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Marquee
          </Link>
          <Link
            to="/social-login"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Social Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;