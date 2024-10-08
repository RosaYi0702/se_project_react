import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  buttonSecondText,
  handleCloseModal,
  isOpened,
  handleSubmit,
  handleSwitchModal,
  isLoading,
}) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_form">
        <button className="modal__close" type="button">
          <img
            src={close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseModal}
          />
        </button>

        <h2 className="modal__title">{titleText}</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          {children}
          <div className="modal__submit-buttons">
            <button type="submit" className="modal__submit">
              {isLoading ? "Saving..." : buttonText}
            </button>
            <button
              type="button"
              className="modal__submit_or"
              onClick={handleSwitchModal}
            >
              {buttonSecondText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
