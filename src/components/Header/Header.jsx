import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/menu-icon.png";

function Header({ handleAddClick, weatherData, toggleMobileMenu }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />

      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__menu" type="button">
        <img
          src={menu}
          alt="menu-icon"
          className="header__menu_img"
          onClick={toggleMobileMenu}
        />
      </button>
      <div className="header__user-container">
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="user-image" className="header__user-image" />
      </div>
    </header>
  );
}

export default Header;
