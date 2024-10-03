import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import like from "../../assets/like.png";
import liked from "../../assets/liked.png";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item?.likes?.some((id) => id === currentUser?._id);

  const openPreview = () => {
    handleCardClick(item);
  };

  const handleLike = (e) => {
    e.preventDefault();
    console.log("handleLike:", item._id);
    handleCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        src={isLiked ? liked : like}
        alt={isLiked ? "liked" : "like"}
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
