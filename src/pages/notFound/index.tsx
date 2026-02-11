import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 px-6 overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-30 animate-bounce" />

      <div className="text-center max-w-2xl z-10">
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved. Don’t
          worry, you can return to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
