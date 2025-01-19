import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";

const NavBar = () => {
  // for toggle the menu bar in small screen
  const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false :true);
  //the themes
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("voting-app-theme") || " "
  );

  // close the nav bar after selecting the one part of results ,elections or logout
  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };
  // change theme handler or toggling it updates and etc
  const changeThemeHandler = () => {
    if (localStorage.getItem("voting-app-theme") ==="dark") {
      localStorage.setItem("voting-app-theme", "");
    } else {
      localStorage.setItem("voting-app-theme", "dark");
    }
    setDarkTheme(localStorage.getItem("voting-app-theme"));
  };
  // use effects for the toggle to work well once the page loads
  useEffect(() => {
    document.body.className = localStorage.getItem("voting-app-theme");
  }, [darkTheme]);
  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo">
          SAMRATA
        </Link>
        <div>
          {/* use for displaying the nav bar in the small  */}
          {showNav && (
            <menu>
              <NavLink to="/election" onClick={closeNavMenu}>
                Elections
              </NavLink>
              <NavLink to="/results" onClick={closeNavMenu}>
                Results
              </NavLink>
              <NavLink to="/logout" onClick={closeNavMenu}>
                LogOut
              </NavLink>
            </menu>
          )}
          <button className="theme_toggle-btn" onClick={changeThemeHandler}>
            {darkTheme ? <IoIosSunny /> : <IoMdMoon />}
          </button>
          <button
            className="nav_toggle-btn"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
