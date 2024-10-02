import "./ItemCard.css";
import like from "../../assets/like.png";
import liked from "../../assets/liked.png";

function ItemCard({ item, handleCardClick, handleCardLike, currentUser }) {
  const openPreview = () => {
    handleCardClick(item);
  };
  const isLiked = item?.likes?.some((userId) => userId === currentUser?._id);
  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        src={isLiked ? liked : like}
        alt="like"
        className="card__like"
        onClick={handleLike}
      />

      <img
        onClick={openPreview}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
