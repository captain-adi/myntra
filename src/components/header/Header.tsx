import { memo, useCallback, useState } from "react";
import { Search, Heart, Handbag, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import { useAppSelector } from "../../hooks/hook";

const navLinks = [
  { label: "MEN", to: "#" },
  { label: "WOMEN", to: "#" },
  { label: "KIDS", to: "#" },
  { label: "HOME & LINING", to: "#" },
  { label: "BEAUTY", to: "#" },
  { label: "STUDIO", to: "#" },
] as const;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, bagItems } = useAppSelector((state) => ({
    user: state.auth.user,
    bagItems: state.bag.bagItems,
  }));

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Hamburger Menu Button */}
        <button className="text-2xl sm:hidden" onClick={toggleMenu}>
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
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
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
            {bagItems.length > 0 && (
              <span className="absolute -top-2 left-3.5 rounded-full bg-red-500 p-0.5 px-2 text-sm text-white">
                {bagItems.length}
              </span>
            )}
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
          <nav>
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 border-b w-full"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
