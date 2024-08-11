import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__your-items">Your Items</p>
        <button className="clothes-section__add-new">+ Add new</button>
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
