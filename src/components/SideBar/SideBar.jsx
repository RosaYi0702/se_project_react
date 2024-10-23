import "./SideBar.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

export default function SideBar({
  handleUpdateProfile,
  handleUpdateProfileModal,
  handleCloseModal,
  activeModal,
}) {
  const navigate = useNavigate();
  const { setIsLoggedIn, currentUser } = useContext(CurrentUserContext);

  function signOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="sidebar__avatar"
        />
        <div className="sidebar__menu">
          <p className="sidebar__name">{currentUser.name}</p>
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
        handleCloseModal={handleCloseModal}
        activeModal={activeModal}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
