import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddGarmentModal,
}) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}
