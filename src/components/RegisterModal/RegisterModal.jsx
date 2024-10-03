import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function RegisterModal({
  isOpened,
  handleCloseModal,
  handleRegister,
  handleLogInModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email, password, name, avatar };
    handleRegister(formData);
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign Up"
      buttonSecondText="or Log In"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleSwitchModal={handleLogInModal}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <span className="modal__error"> (This is not an Email.)</span>
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
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
