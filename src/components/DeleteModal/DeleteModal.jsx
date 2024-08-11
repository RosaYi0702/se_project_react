import "./DeleteModal.css";

export default function DeleteModal({ isOpened }) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container"></div>
    </div>
  );
}
