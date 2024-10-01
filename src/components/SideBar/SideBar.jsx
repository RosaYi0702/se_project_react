import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

export default function SideBar({
  userName,
  userAvatar,
  handleUpdateProfile,
  handleUpdateProfileModal,
  handleCloseModal,
  activeModal,
}) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(CurrentUserContext);

  function signOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={userAvatar} alt="Avatar" className="sidebar__avatar" />
        <div className="sidebar__menu">
          <p className="sidebar__name">{userName}</p>
        </div>
      </div>
      <div className="sidebar__setting">
        <button
          className="sidebar__change-profile"
          onClick={() => {
            console.log("changeProfile data click");
            handleUpdateProfileModal();
          }}
        >
          Change profile data
        </button>
        <button className="sidebar__log-out" onClick={signOut}>
          Log out
        </button>
      </div>
      <EditProfileModal
        isOpened={activeModal === "update-profile"}
        userAvatar={userAvatar}
        userName={userName}
        handleCloseModal={handleCloseModal}
        activeModal={activeModal}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
