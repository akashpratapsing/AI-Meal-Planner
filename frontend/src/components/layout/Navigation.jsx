import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col items-start">
            <span
              className="text-4xl font-bold tracking-tight"
              style={{
                fontFamily:
                  "'Brush Script MT', cursive, 'Comic Sans MS', sans-serif",
              }}
            >
              FitMeal
            </span>
            <div className="w-full h-0.5 bg-black rounded-full -mt-1"></div>
          </div>
          <span className="sr-only">FitMeal</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-base-content/70">
          <a href="#hero" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a
            href="#testimonials"
            className="hover:text-primary transition-colors"
          >
            Testimonials
          </a>
          <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="btn btn-sm btn-outline btn-primary rounded-full px-6"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
