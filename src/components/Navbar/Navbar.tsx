import { useContext, useState } from "react";
import logo from "./../../assets/imges/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../CartContext/CartContext";

const Navbar = () => {
  const { numOfItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-100 shadow-lg p-4 fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-6">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-32 mx-7" />
            </NavLink>
          </div>

          {/* Navigation Links - Large Screens */}
          <ul className="hidden md:flex flex-grow space-x-6 text-gray-700 text-lg">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-green-500 text-white px-3 py-1 rounded-md" : "hover:text-green-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive ? "bg-green-500 text-white px-3 py-1 rounded-md" : "hover:text-green-500"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive ? "bg-green-500 text-white px-3 py-1 rounded-md" : "hover:text-green-500"
                }
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  isActive ? "bg-green-500 text-white px-3 py-1 rounded-md" : "hover:text-green-500"
                }
              >
                Category
              </NavLink>
            </li>
          </ul>

          {/* Mobile Icons & Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <NavLink to="/wishlist" className="text-green-500 text-2xl">
              <i className="fa-regular fa-heart"></i>
            </NavLink>
            <NavLink to="/cart" className="relative text-green-500 text-2xl">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {numOfItems}
              </span>
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* User Actions - Large Screens */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {token ? (
              <>
                <NavLink to="/cart" className="relative text-green-500 text-2xl">
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {numOfItems}
                  </span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
                <NavLink to="/wishlist" className="text-green-500 text-2xl">
                  <i className="fa-regular fa-heart"></i>
                </NavLink>
                <button
                  onClick={logout}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Login
                </NavLink>
                <NavLink to="/register" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Side Drawer) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu List */}
        <ul className="flex flex-col items-start mt-16 space-y-6 px-6 text-lg font-medium text-gray-700">
          <li>
            <NavLink to="/" className="block w-full py-2 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className="block w-full py-2 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" className="block w-full py-2 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/category" className="block w-full py-2 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
              Category
            </NavLink>
          </li>
        </ul>
      </div>

      {/* إضافة margin-top لتجنب مشكلة المسافة الكبيرة */}
      <main className="pt-16">
        {/* محتوى الصفحة سيظهر هنا */}
      </main>
    </>
  );
};

export default Navbar;
