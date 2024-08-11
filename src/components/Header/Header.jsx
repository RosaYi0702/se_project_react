import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/menu-icon.png";
import close from "../../assets/close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <nav
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_mobile" : ""
        }`}
      >
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>

        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        {isMobileMenuOpened ? (
          <button className=" header__menu_close" type="button">
            <img
              src={close}
              alt="close-icon"
              className="  header__menu_close_img"
              onClick={toggleMobileMenu}
            />
          </button>
        ) : (
          <button className="header__menu" type="button">
            <img
              src={menu}
              alt="menu-icon"
              className="header__menu_img"
              onClick={toggleMobileMenu}
            />
          </button>
        )}

        <div className="header__user-container">
          <ToggleSwitch />
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <Link className="header__link" to="/profile">
            <p className="header__user-name">Terrence Tegegne</p>
            <img src={avatar} alt="user-image" className="header__user-image" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
