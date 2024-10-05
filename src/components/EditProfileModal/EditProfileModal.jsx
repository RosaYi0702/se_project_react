import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

export default function EditProfileModal({
  isOpened,
  handleCloseModal,
  handleUpdateProfile,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({ name: "", avatar: "" });

  useEffect(() => {
    if (isOpened) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpened, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateProfile(values);
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="editProfileName"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          name="name"
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="editProfileAvatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          name="avatar"
        />
      </label>
    </ModalWithForm>
  );
}
