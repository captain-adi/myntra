import { useState } from "react";
import { Search, Heart, Handbag, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import { useBag } from "../../context/BagContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { bagItems } = useBag();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Hamburger Menu Button */}
        <button
          className="text-2xl sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X cursor={"pointer"} /> : <Menu cursor={"pointer"} />}
        </button>
        {/* Logo */}
        <Link to="/" className="">
          <img
            src="/Image/myntra_logo.webp"
            alt="Myntra Logo"
            className="h-[2.5rem] md:h-[3rem]"
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden sm:flex gap-5 text-xs  font-bold">
          <Link to="#">MEN</Link>
          <Link to="#">WOMEN</Link>
          <Link to="#">KIDS</Link>
          <Link to="#">HOME & LINING</Link>
          <Link to="#">BEAUTY</Link>
          <Link to="#">STUDIO</Link>
        </nav>

        {/* Search Bar for Desktop */}
        <div className="hidden xl:flex items-center w-[40%] border rounded-md shadow-sm bg-gray-100">
          <Search className="ml-3 text-gray-500" />
          <input
            type="text"
            className="w-full py-2 px-4 bg-transparent outline-none text-sm"
            placeholder="Search for products, brands and more"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <ProfileDropdown />
          ) : (
            <Link to={"/login"} className="flex flex-col items-center">
              <User className="w-4 h-4 md:w-6 md:h-6  text-gray-600" />
              <span className="text-[0.7rem]">Login</span>
            </Link>
          )}

          <Link to={"/wishlist"} className="flex flex-col items-center">
            <Heart className="w-4 h-4 md:w-6 md:h-6  text-gray-600" />
            <span className="text-[0.7rem]">Wishlist</span>
          </Link>
          <Link
            to="/checkout/bag"
            className="flex flex-col items-center relative"
          >
            <Handbag className="w-4 h-4 md:w-6 md:h-6  text-gray-600" />
            <span className="absolute -top-2 left-3.5 rounded-full bg-red-500 p-0.5 px-2 text-sm text-white">
              {bagItems.length}
            </span>
            <span className="text-[0.7rem]">Bag</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden w-full bg-white shadow-md absolute">
          {/* Search Bar */}
          <div className="flex m-auto items-center w-[85vw] border rounded-md shadow-sm bg-gray-100 p-2 mb-4">
            <Search className="ml-3 text-gray-500" />
            <input
              type="text"
              className="w-full py-2 px-4 bg-transparent outline-none text-sm"
              placeholder="Search for products, brands and more"
            />
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col items-start gap-4 px-4 pb-6 text-sm font-semibold">
            <Link to="#" onClick={() => setMenuOpen(false)}>
              MEN
            </Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>
              WOMEN
            </Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>
              KIDS
            </Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>
              HOME & LINING
            </Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>
              BEAUTY
            </Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>
              STUDIO
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
