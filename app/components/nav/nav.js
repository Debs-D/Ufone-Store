"use client";
import React, { useContext, useEffect, useState } from "react";
import { ContextFunction } from "../../Context/Context";
import {
  getCart,
  getWishList,
  handleClickOpen,
  handleClose,
  handleLogOut,
} from "../../Constants/Constant";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import "./nav.css";
// import { Console } from 'console';

const Navbar = () => {
  const { cart, setCart, wishlistData, setWishlistData } =
    useContext(ContextFunction);
  const [openAlert, setOpenAlert] = useState(false);
  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken !== null ? true : false;
  const [data, setData] = useState([]);
  const { push } = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    getCart(setProceed, setCart, authToken);
    getWishList(setProceed, setWishlistData, authToken);
  }, []);

  const handleSearch = (event) => {
    console.log("--------just search------->", event.target.value);
    setSearchTerm(event.target.value);
  };

  const executeSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/product?name=${encodeURIComponent(searchTerm)}`);
    }
  };

  const Search = () => {
    push(`/product?name=${searchTerm}`);
  };

  <header className="">
    <nav className="nav-bar flex flex-wrap items-center justify-between px-3 py-2 lg:px-20">
      <div className="md:flex hidden  flex-no-shrink items-center mr-6 py-3 px-2 text-grey-darkest"></div>
    </nav>
  </header>;
  return (
    <>
      <nav className="bg-white border-white-200 dark:bg-white-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://res.cloudinary.com/codepally/image/upload/v1665659075/UFUON%20LOGO%20PNG/ufuon_logo_2_alt9px.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ufuon
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-5 rtl:space-x-reverse">
            {setProceed ? (
              <a
                href="/profile"
                className="flex text-sm  rounded-full md:me-0 focus:ring-4  "
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="data:image/png;base64,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"
                  alt="user photo"
                />
                <span className="mt-1 ml-1">
                  <b className="dark:text-black">Profile</b>
                </span>
              </a>
            ) : (
              <a
                href="/auth/sign"
                type="button"
                className="flex text-sm  rounded-full md:me-0 focus:ring-4  "
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="data:image/png;base64,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"
                  alt="user photo"
                />
                <span className="mt-1 ml-1">
                  <b className="dark:text-black">log in / Register</b>
                </span>
              </a>
            )}

            <a
              href="/wishlist"
              className="flex text-sm bg-[#fe0804]   rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 pr-3"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhyp0y0G1tsRP_l3Q-XvWQ-5HQYrHwpGaP2g&s"
                alt="user photo"
              />
              <span className="mt-1 ml-1">
                <b>{setProceed ? wishlistData.length : 0}</b>
              </span>
            </a>

            <a
              href="/cart"
              className="flex text-sm bg-[#fe0804]  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 pr-3"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSzPjIX8WT5WOFAGO-rC3qSw1tOOG70PUXMQ&s"
                alt="user photo"
              />
              <span className="mt-1 ml-1">
                <b>{setProceed ? cart.length : 0}</b>
              </span>
            </a>

            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white-800 md:dark:bg-white-900 dark:border-white-700">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ufuon.com/about"
                    target={"_blank"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.ufuon.com/"
                    target={"_blank"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.ufuon.com/"
                    target={"_blank"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My Project
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ufuon.com/contact"
                    target={"_blank"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Learning
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ufuon.com/contact"
                    target={"_blank"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          }
        </div>
      </nav>
      <div className="bg-blue-600 border-white-200 dark:bg-white-900 mt-2 pt-2 pb-2  rounded-xl	  items-left justify-between">
        <div className="navBar-banner">
          <div className="navBar-left w-full px-2">
            <div className="max-w-lg mx-auto ml-2 inline-block;">
              <div className="flex">
                {
                  <>
                    <label
                      htmlFor="search-dropdown"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Your Email
                    </label>
                    <button
                      id="dropdown-button"
                      data-dropdown-toggle="dropdown"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-white-300 rounded-s-lg hover:bg-white-200 focus:ring-4 focus:outline-none focus:ring-write-100 dark:bg-white-700 dark:hover:bg-white-600 dark:focus:ring-white-700 dark:text-black dark:border-gray-600"
                      type="button"
                    >
                      All categories{" "}
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                  </>
                }

                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos, Design Templates..."
                    required
                  />
                  <button
                    onClick={executeSearch}
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#fe0804] rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="navBar-right hidden md:flex">
            <div className="flex justify-between w-full pt-2">
              <div>free shipping over $199</div>
              <div>30 days money back</div>
              <div>100% secure payment</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
