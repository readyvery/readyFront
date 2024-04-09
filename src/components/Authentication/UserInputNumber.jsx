import { message } from "antd";
import { useState } from "react";
import useFetchUserPhoneNumber from "../../hooks/useFetchUserPhoneNumber";
import useSendSms from "../../hooks/useSendSms";
import RedButton from "./RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage";

const TIMER_DURATION = 180; //타이머 시간 설정(3분)

const UserInputNumber = () => {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 여부
  const { handleFetchUserPhoneNumber } = useFetchUserPhoneNumber();
  const { handleSendSms } = useSendSms();

  const handleCheckSendSem = (send) => {
    setPostmessage(send);
  };

  const handleButtonClick = () => {
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      setChkButton(true);
      if (!postmessage) {
        handleSendSms(Phonenumber, handleCheckSendSem);
      } else {
        setPostmessage(false);
        handleSendSms(Phonenumber, handleCheckSendSem);
      }
    } else {
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePhoneChange = (event) => {
    const HyphenNumber = event.target.value.replace(/[^0-9]/g, "");
    setPhonenumber(HyphenNumber);
  };
  const displayFormattedPhoneNumber = (numbers) => {
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7
      )}`;
    }
  };
  // 번호 인증 성공 여부 확인
  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };

  const handleRegisterClick = () => {
    if (verifyState) {
      handleFetchUserPhoneNumber(Phonenumber);
    } else {
      message.info("전화번호 인증부터 진행해주세요.");
    }
  };

  return (
    <div className="user-input-phone-number-content-number-wrapper">
      <div className="user-input-phone-number-wrapper">
        <input
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="전화번호"
          value={displayFormattedPhoneNumber(Phonenumber)}
          onChange={handlePhoneChange}
          maxLength="13"
          className="user-input-phone-number-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`user-input-phone-number-button ${
            chkButton ? "user-input-phone-number-button-clicked" : ""
          }`}
        >
          인증
        </button>
      </div>
      {postmessage && (
        <UserInputNumberMessage
          phoneNumber={Phonenumber}
          initialTimer={TIMER_DURATION}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      <RedButton
        type="submit"
        onClick={handleRegisterClick}
        className="user-input-phone-number-auth-button"
      >
        확인
      </RedButton>
    </div>
  );
};
export default UserInputNumber;
