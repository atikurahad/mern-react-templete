import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-slate-900">
            MyApp
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/charts"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Charts
          </Link>
          <Link
            to="/testimonials"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Testimonials
          </Link>
          <Link
            to="/marquee"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Marquee
          </Link>
          <Link
            to="/social-login"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Social Login
          </Link>
          <Link
            to="/faq"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;