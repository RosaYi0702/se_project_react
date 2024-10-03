import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  isOpened,
  handleCloseModal,

  handleUpdateProfile,
}) {
  const { isLoggedIn, setIsLoggedIn, currentUser } =
    useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpened) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpened, currentUser.name, currentUser.avatar]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, avatar };
    console.log("Form data: ", { name, avatar });
    handleUpdateProfile(formData);
    handleCloseModal();
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
