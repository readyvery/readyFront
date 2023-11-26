import berry from "../../../assets/images/berry.png";
import "./Modal.css";

const Modal = ({ setIsOpen, handleCancle, title, subtitle }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-box">
        <div>
          <img src={berry} alt="berry" />
        </div>
        <div className="modal-title">{title}</div>
        <div className="modal-subtitle">{subtitle}</div>
        <div className="modal-btn__wrapper">
          <span
            className="modal-cancle-btn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            취소
          </span>
          <span className="modal-check-btn" onClick={handleCancle}>
            확인
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
