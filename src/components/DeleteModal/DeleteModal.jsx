import "./DeleteModal.css";
import close from "../../assets/close.svg";

export default function DeleteModal({
  item,
  isOpened,
  handleCloseModal,
  handleDeleteItem,
  handleDeleteClose,
}) {
  const deleteCard = () => {
    handleDeleteItem(item);
  };

  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_delete">
        <button className="modal__close" type="button">
          <img
            src={close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseModal}
          />
        </button>
        <p className="modal__delete_question">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>

        <button type="submit" className="modal__confirm" onClick={deleteCard}>
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__cancel"
          onClick={handleDeleteClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
