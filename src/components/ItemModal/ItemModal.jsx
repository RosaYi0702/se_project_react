import "./ItemModal.css";
import { useState } from "react";
import React from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import white_close from "../../assets/white_close.png";

function ItemModal({
  isOpened,
  selectedCard,
  handleCloseModal,
  deleteModal,
  openDeleteModal,
  handleDeleteClose,
  handleDeleteItem,
  currentUser,
}) {
  const isOwn = selectedCard.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__footer_delete ${
    isOwn ? "modal__footer_delete_visible" : "modal__footer_delete_hidden"
  }`;

  if (!isOpened) {
    return null;
  }

  console.log(selectedCard);
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_image">
        <button className="modal__close" type="button">
          <img
            src={white_close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseModal}
          />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__card_image"
        />
        <div className="modal__footer">
          <div className="modal__footer_info">
            <h2 className="modal__card_name">{selectedCard.name}</h2>
            <p className="modal__card_weather">
              Weather: {selectedCard.weather}
            </p>
          </div>
          <div className={itemDeleteButtonClassName}>
            <button
              type="button"
              className="modal__card_delete"
              onClick={openDeleteModal}
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        item={selectedCard}
        isOpened={deleteModal === "delete"}
        handleCloseModal={handleCloseModal}
        handleDeleteItem={handleDeleteItem}
        handleDeleteClose={handleDeleteClose}
      />
    </div>
  );
}

export default ItemModal;
