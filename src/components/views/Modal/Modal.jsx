import { IMAGES } from "../../../constants/images";
import "./Modal.css";

const Modal = ({ setIsOpen, handleCancel, title, subtitle, isOk }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-box">
        <img src={IMAGES.berry} alt="berry" />
        <div className="modal-title">{title}</div>
        <div className="modal-subtitle">{subtitle}</div>
        <div className="modal-btn__wrapper">
          {isOk ? (
            <span 
              className="modal-check-btn"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              확인
            </span>
          ) : (
            <>
              <span
                className="modal-cancle-btn"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                취소
              </span>
              <span className="modal-check-btn" onClick={handleCancel}>
                확인
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
