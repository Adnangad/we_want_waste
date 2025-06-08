import { useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import "./App.css";
import Progress from "./components/ProgressBar";

import Cards from "./components/Cards";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""} bg-white dark:bg-gray-900 min-h-screen`}>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 top-0 z-60 sticky">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-xl md:text-2xl font-semibold text-black whitespace-nowrap dark:text-white">
              REM WASTE MANAGEMENT
            </span>
          </a>
          <button
            className="md:hidden text-2xl text-black dark:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
          <div className={`w-full md:w-auto md:flex ${menuOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0 font-medium bg-white md:bg-transparent dark:bg-gray-900 px-4 md:px-0 py-2 md:py-0 rounded md:rounded-none shadow md:shadow-none">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white"
                >
                  Home
                </a>
              </li>
              {["About", "Services", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}

              <li className="relative">
                <VscAccount
                  className="text-xl mt-2 cursor-pointer text-black dark:text-white"
                  onClick={() => setShowDropdown((prev) => !prev)}
                />

                {showDropdown && (
                  <div
                    className={`absolute md:absolute ${menuOpen ? "left-4" : "right-0"
                      } mt-2 z-20 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
                  >
                    <ul className="text-sm text-gray-700 dark:text-gray-200">
                      <li
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          setDarkMode(false);
                          setShowDropdown(false);
                        }}
                      >
                        <GoSun className="mr-2" /> Light Mode
                      </li>
                      <li
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          setDarkMode(true);
                          setShowDropdown(false);
                        }}
                      >
                        <GoMoon className="mr-2" /> Dark Mode
                      </li>
                    </ul>
                  </div>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <Progress />
      <Cards />
    </div>
  );
}

export default App;
