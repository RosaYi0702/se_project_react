import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddGarmentModal,
  currentUserId,
  userName,
  userAvatar,
  handleUpdateProfile,
  handleUpdateProfileModal,
  handleCloseModal,
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
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddGarmentModal={handleAddGarmentModal}
          currentUserId={currentUserId}
        />
      </section>
    </div>
  );
}
