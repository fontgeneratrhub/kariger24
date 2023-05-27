import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const NavbarCmp = () => {
  // For the Dropdown in Nav
  const [dropIsOpen, setDropIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  // For The Animated Scroll Up Behaviour of Navbar
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, setVisible]);

  // set dummy user

  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);

  // create dummy array of user object
  const users = [
    {
      id: "1",
      displayName: "Admin",
      email: "admin@kariger.com",
      emailVerified: true,
      isAdmin: true,
      isTechnician: false,
      phoneNumber: null,
      metadata: {
        creationTime: "2021-05-31T18:00:00.000Z",
        lastSignInTime: "2021-05-31T18:00:00.000Z",
      },
      photoURL: null,
    },
    {
      id: "2",
      displayName: "Jane Doe",
      email: "jane@kariger.com",
      emailVerified: true,
      isAdmin: false,
      isTechnician: true,
      phoneNumber: null,
      metadata: {
        creationTime: "2021-05-31T18:00:00.000Z",
        lastSignInTime: "2021-05-31T18:00:00.000Z",
      },
      photoURL: null,
    },
    {
      id: "3",
      displayName: "John Doe",
      email: "john@kariger.com",
      emailVerified: true,
      isAdmin: false,
      isTechnician: false,
      phoneNumber: null,
      metadata: {
        creationTime: "2021-05-31T18:00:00.000Z",
        lastSignInTime: "2021-05-31T18:00:00.000Z",
      },
      photoURL: null,
    },
  ];

  // set dummy user
  useEffect(() => {
    setUserInfo(users[0]);
    setIsAdmin(users[0].isAdmin);
    setIsTechnician(users[0].isTechnician);
  }, []);

  const logoutHandler = () => {
    setUserInfo(null);
    setDropIsOpen(!dropIsOpen);
  };

  return (
    <nav
      className={`fixed bg-gray-900 w-screen shadow-md z-50 transition-all duration-500 ${
        visible ? "" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center  sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 border border-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-2xl font-semibold text-white ml-8 sm:ml-0"
              >
                Kariger.com
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  to="/"
                  className="block mt-4 lg:inline-block lg:mt-0 p-2 rounded text-gray-200  hover:bg-gray-700  hover:text-white "
                >
                  Home
                </Link>
                <Link
                  to="/technicians"
                  className="block mt-4 lg:inline-block lg:mt-0 p-2 rounded text-gray-200  hover:bg-gray-700  hover:text-white "
                >
                  Technicians
                </Link>
                <Link
                  to="/contact"
                  className="block mt-4 lg:inline-block lg:mt-0 p-2 rounded text-gray-200  hover:bg-gray-700  hover:text-white "
                >
                  Contact-Us
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-5">
            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="secondary"
                  onClick={() => setDropIsOpen(!dropIsOpen)}
                  className="text-white rounded-md"
                >
                  {userInfo.displayName}
                </Button>
                {dropIsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                      <Link
                        to={
                          isAdmin
                            ? "/admin/dashboard"
                            : isTechnician
                            ? "/technician/dashboard"
                            : "/user/dashboard"
                        }
                        className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base hover:font-bold"
                        onClick={() => setDropIsOpen(!dropIsOpen)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base hover:font-bold"
                        onClick={() => setDropIsOpen(!dropIsOpen)}
                      >
                        Profile
                      </Link>
                      <Link
                        onClick={logoutHandler}
                        className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base hover:font-bold"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-600 font-medium text-white rounded-md text-sm my-2 px-2 py-2 sm:text-md sm:my-4 sm:py-3 sm:px-4">
                  Login / Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <Link
            to="/"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Home
          </Link>
          <Link
            to="/technicians"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Technicians
          </Link>
          <Link
            to="/contact"
            className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Contact-Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCmp;
