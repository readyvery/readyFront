import berry from "../../../assets/images/berry.png";
import "./Modal.css";

const Modal = ({ setIsOpen, handleCancle }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-box">
        <div>
          <img src={berry} alt="berry" />
        </div>
        <div className="modal-title">주문을 취소하시겠습니까?</div>
        <div className="modal-subtitle">
          확인 버튼을 누르시면, 주문이 취소됩니다.
        </div>
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
