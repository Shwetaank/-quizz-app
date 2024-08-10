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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-20 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl shadow-md relative">
      {/* Logo and Get Started Button for small screens */}
      <div className="flex items-center gap-4">
        <img src={img} alt="Almabetter logo" className="h-12 w-22 p-2" />
        {!isSignedIn && (
          <div className="sm:hidden">
            <Link to="/auth/sign-in">
              <Button className="bg-black rounded-md p-1 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Hamburger icon for small screens */}
      <div className="sm:hidden ml-auto">
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          className="text-3xl"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Links and user button for medium and larger screens */}
      <div className="hidden sm:flex items-center gap-20">
        {isSignedIn ? (
          <>
            <div className="flex items-center justify-center gap-20 font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white p-2 rounded"
                    : "hover:text-blue-500"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/my-quizzes"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white p-2 rounded"
                    : "hover:text-blue-500"
                }
              >
                My Quizzes
              </NavLink>
              <NavLink
                to="/play-quiz"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white p-2 rounded"
                    : "hover:text-blue-500"
                }
              >
                Play Quiz
              </NavLink>
              <NavLink
                to="/about-me"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white p-2 rounded"
                    : "hover:text-blue-500"
                }
              >
                About Me
              </NavLink>
            </div>
            <UserButton />
          </>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-black rounded-md p-1 font-semibold">
              Get Started
            </Button>
          </Link>
        )}
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="sm:hidden absolute z-40 top-20 left-0 w-full bg-white shadow-md"
        >
          <div className="flex flex-col items-center gap-4 p-4 font-semibold">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white text-center p-2 rounded"
                  : "hover:text-blue-500 w-full text-center"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/my-quizzes"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white text-center p-2 rounded"
                  : "hover:text-blue-500 w-full text-center"
              }
            >
              My Quizzes
            </NavLink>
            <NavLink
              to="/play-quiz"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white text-center p-2 rounded"
                  : "hover:text-blue-500 w-full text-center"
              }
            >
              Play Quiz
            </NavLink>
            <NavLink
              to="/about-me"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white text-center p-2 rounded"
                  : "hover:text-blue-500 w-full text-center"
              }
            >
              About Me
            </NavLink>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="/auth/sign-in" className="w-full">
                <Button
                  title="Click here to get started"
                  className="bg-black w-full p-2 rounded-md font-bold text-center"
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
