import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function LoginModal({
  isOpened,
  handleLogIn,
  handleCloseModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email, password };
    handleLogIn(formData);
  };

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Log In"
      buttonSecondText="or Sign Up"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
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
        Password
        <span className="modal__error"> (Password incorrect.)</span>
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
}
