import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "flowbite-react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import img from "../assets/logo.png";

const Header = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest(".clerk-user-button-dropdown")
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-r from-black to-gray-500 text-white p-2 rounded"
            : "hover:text-blue-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/play-quiz"
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-r from-black to-gray-500 text-white p-2 rounded"
            : "hover:text-blue-500"
        }
      >
        Play Quiz
      </NavLink>
      <NavLink
        to="/create-quiz"
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-r from-black to-gray-500 text-white p-2 rounded"
            : "hover:text-blue-500"
        }
      >
        Create Quiz
      </NavLink>
      <NavLink
        to="/my-quizzes"
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-r from-black to-gray-500 text-white p-2 rounded"
            : "hover:text-blue-500"
        }
      >
        My Quizzes
      </NavLink>
      <NavLink
        to="/about-me"
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-r from-black to-gray-500 text-white p-2 rounded"
            : "hover:text-blue-500"
        }
      >
        About Me
      </NavLink>
    </>
  );

  return (
    <nav className="h-20 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl shadow-md relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={img} alt="Logo" className="h-12 w-22 p-2" />
      </div>

      {/* Buttons for small screens */}
      <div className="flex items-center gap-4 ml-auto sm:hidden">
        {isSignedIn ? (
          <div className="transform transition-all duration-300 hover:scale-125 mr-4">
            <UserButton className="shadow-lg border-2 border-transparent hover:border-blue-500" />
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-black rounded-md p-2 font-bold">
              Get Started
            </Button>
          </Link>
        )}
        {isSignedIn && (
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            className="text-3xl"
          >
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        )}
      </div>

      {/* Links and user button for medium and larger screens */}
      <div className="hidden sm:flex items-center gap-20">
        {isSignedIn ? (
          <>
            <div className="flex items-center gap-20 font-semibold">
              {navLinks}
            </div>
            <div className="transform transition-all duration-300 hover:scale-125">
              <UserButton className="shadow-lg border-2 border-transparent hover:border-blue-500" />
            </div>
          </>
        ) : (
          <Link to="/auth/sign-in">
            <Button color="dark" pill >
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Dropdown menu for small screens */}
      {isSignedIn && isMenuOpen && (
        <div
          ref={menuRef}
          className="sm:hidden absolute z-40 top-20 left-0 w-full bg-gradient-to-b from-blue-100 to-red-100 shadow-md"
        >
          <div className="flex flex-col items-center gap-4 p-4 font-semibold">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
