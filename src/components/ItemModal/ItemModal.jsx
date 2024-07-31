import "./ItemModal.css";
import white_close from "../../assets/white_close.png";

function ItemModal({ isOpened, selectedCard, handleCloseClick }) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_image">
        <button className="modal__close" type="button">
          <img
            src={white_close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseClick}
          />
        </button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__card_image"
        />
        <div className="modal__footer">
          <h2 className="modal__card_name">{selectedCard.name}</h2>
          <p className="modal__card_weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
