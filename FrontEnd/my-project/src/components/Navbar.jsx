// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets/assets_frontend/assets.js";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import  HelperMuiNavbar  from "../helper/helperMuiNavbar.jsx";
// import { AppContext } from "../context/AppContexts.jsx";

// const Navbar = () => {

//   const { aToken, setAToken } = useContext(AppContext);

//   const navigate = useNavigate();

//   const handleBtnClick = () => {

//     navigate("/login");
//   }

//   return (
//     <>
//       <div className="navbar h-{60px}  static flex flex-row justify-between ">
//         <img onClick={()=>navigate("/")} className="flex items-center m-2" src={assets.logo} alt="" />
//         <ul className="flex flex-row space-x-1 w-{360px} m-2 p-2 items-center gap-3">
//           <li>
//             <Link to="/">HOME</Link>
//           </li>
//           <li>
//             <Link to="/doctors">ALL DOCTORS</Link>
//           </li>
//           <li>
//             <Link to="/about">ABOUT</Link>
//           </li>
//           <li>
//             <Link to="/contacts">CONTACTS</Link>
//           </li>
//         </ul>

//         <div className="flex justify-end m-2">
//           {aToken ? (
//             <>

//               <HelperMuiNavbar />

//             </>
//           ) : (
//             <>
//               <button onClick={handleBtnClick} className="btn">
//                 Create Account
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;







import React, { useContext, useState } from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
import { Link, useNavigate } from "react-router-dom";
import HelperMuiNavbar from "../helper/helperMuiNavbar.jsx";
import { AppContext } from "../context/AppContexts.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { aToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBtnClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar flex justify-between items-center px-4 py-2 shadow-md bg-white relative z-50">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer"
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-semibold">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/doctors">ALL DOCTORS</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/contacts">CONTACTS</Link>
          </li>
        </ul>

        {/* Account Button or Profile */}
        <div className="hidden md:flex">
          {aToken ? (
            <HelperMuiNavbar />
          ) : (
            <button
              onClick={handleBtnClick}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-40 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Menu Links */}
        <div className="flex flex-col justify-center items-center space-y-6 text-gray-700 font-semibold text-xl h-full">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/doctors" onClick={() => setMenuOpen(false)}>
            ALL DOCTORS
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            ABOUT
          </Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)}>
            CONTACTS
          </Link>
          {!aToken && (
            <button
              onClick={() => {
                handleBtnClick();
                setMenuOpen(false);
              }}
              className="text-white bg-blue-500 px-6 py-2 rounded-md"
            >
              Create Account
            </button>
          )}
          {aToken && <HelperMuiNavbar />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
