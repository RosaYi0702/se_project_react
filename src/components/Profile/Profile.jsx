import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddGarmentModal,

  userName,
  userAvatar,
  handleUpdateProfile,
  handleUpdateProfileModal,
  handleCloseModal,
  activeModal,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          userName={userName}
          userAvatar={userAvatar}
          handleUpdateProfile={handleUpdateProfile}
          handleUpdateProfileModal={handleUpdateProfileModal}
          handleCloseModal={handleCloseModal}
          activeModal={activeModal}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddGarmentModal={handleAddGarmentModal}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}
