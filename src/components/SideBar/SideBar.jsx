import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__name">Terrence Tegegne</p>
    </div>
  );
}
