import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  isOpened,
  handleCloseModal,
  userAvatar,
  userName,
}) {
  console.log("isOpened in EditProfileModal:", isOpened);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpened) {
      setName(userName);
      setAvatar(userAvatar);
    }
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, avatar };
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="Name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="AvatarUrl" className="modal__label">
        Avatar URL*
        <input
          type="link"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
