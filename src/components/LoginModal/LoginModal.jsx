import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useForm } from "../../hooks/useForm";

export default function LoginModal({
  isOpened,
  handleLogIn,
  handleCloseModal,
  handleRegisterModal,
  isLoading,
}) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn(values);
  };

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Log In"
      buttonSecondText="or Sign Up"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleSwitchModal={handleRegisterModal}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Email
        <span className="modal__error"> (This is not an Email.)</span>
        <input
          type="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
      </label>
      <label className="modal__label">
        Password
        <span className="modal__error"> (Password incorrect.)</span>
        <input
          type="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
      </label>
    </ModalWithForm>
  );
}
