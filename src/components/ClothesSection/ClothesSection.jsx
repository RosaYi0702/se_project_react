import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddGarmentModal,
  currentUserId,
  handleCardLike,
}) {
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUserId
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__your-items">Your Items</p>
        <button
          className="clothes-section__add-new"
          type="button"
          onClick={handleAddGarmentModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__clothing-list">
        {userClothingItems.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          userClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
            />
          ))
        )}
      </div>
    </div>
  );
}
