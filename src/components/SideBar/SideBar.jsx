import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <div className="sidebar__menu">
        <p className="sidebar__name">Terrence Tegegne</p>
        <button className="sidebar__change-profile">Change profile data</button>
        <button className="sidebar__log-out">Log out</button>
      </div>
    </div>
  );
}
