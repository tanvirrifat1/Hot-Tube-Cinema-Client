import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./Header.scss";
import logo from "../../assets/img/hot.png";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { AuthContext } from "../Provider/AuthProvider";
import { getUserInfo } from "../../Shared/auth.service";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const { role } = getUserInfo();
  console.log(role);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  // -----------------//
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Hot-Tube-Cinema</h1>
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          {user ? (
            <>
              <li onClick={handleLogOut} className="menuItem">
                LogOut
              </li>
            </>
          ) : (
            <>
              {" "}
              <Link to={"/login"}>
                <li className="menuItem">Login</li>
              </Link>
            </>
          )}
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
