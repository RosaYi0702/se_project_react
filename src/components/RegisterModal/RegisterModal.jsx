import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function RegisterModal({
  isOpened,
  handleCloseModal,
  handleRegister,
  handleLogInModal,
  isLoading,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(values);
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
      isLoading={isLoading}
    >
      <label className="modal__label">
        Email*
        <span className="modal__error"> (This is not an Email.)</span>
        <input
          type="email"
          className="modal__input"
          id="RegisterEmail"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="RegisterPassword"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="RegisterName"
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
          id="RegisterAvatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          name="avatar"
        />
      </label>
    </ModalWithForm>
  );
}
