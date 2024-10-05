import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  isOpened,
  handleCloseModal,
  handleOptionChange,
  handleAddItem,
  selectedOption,
  isLoading,
}) {
  const { values, handleChange } = useForm({ name: "", imageUrl: "" });

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpened={isOpened}
      handleCloseModal={handleCloseModal}
      handleSubmit={(e) => {
        handleAddItem(e, {
          name: values.name,
          imageUrl: values.imageUrl,
          weatherType: selectedOption,
        });
      }}
      handleOptionChange={handleOptionChange}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          name="name"
        />
      </label>
      <label className="modal__label">
        Image
        <span className="modal__error"> (This is not an Email.)</span>
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          name="imageUrl"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weathe type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={selectedOption === "hot"}
            onChange={handleOptionChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={selectedOption === "warm"}
            onChange={handleOptionChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={selectedOption === "cold"}
            onChange={handleOptionChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
