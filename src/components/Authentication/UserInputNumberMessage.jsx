import React, { useState } from "react";
import useAuthVerification from "../../hooks/useAuthVerification";
import useTimer from "../../hooks/useTimer";
import LoginChkAlrm from "./LoginChkAlrm";
import "./UserInputNumberMessage.css";
const Timer = ({ minutes, seconds }) => (
  <div className="timer">
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
);

function UserInputNumberMessage({ phoneNumber, onAuthSuccess, initialTimer }) {
  const [chkNum, setChkNum] = useState("");
  const { timer } = useTimer(initialTimer);
  const [isCheck, setIsCheck] = useState(false);
  const { handleAuthVerificationNumer } = useAuthVerification();

  // 번호 인증 성공 여부 확인
  const handleCheckInputNumber = (success) => {
    setIsCheck(success);
    onAuthSuccess(success);
  };
  
  const handleInputText = (e) => {
    const newChkNum = e.target.value;
    setChkNum(newChkNum);
    if (newChkNum.length === 6) {
      handleAuthVerificationNumer(
        phoneNumber,
        newChkNum,
        handleCheckInputNumber
      );
    } else {
      handleCheckInputNumber(false);
    }
  };

  return (
    <>
      <div className="user-input-number-message-wrapper">
        <input
          id="username"
          type="text"
          placeholder="인증번호"
          value={chkNum}
          autoComplete="one-time-code" //1번씩 자동완성(인증번호)
          onChange={handleInputText}
          maxLength="6"
        />
        {timer > 0 && (
          <Timer minutes={Math.floor(timer / 60)} seconds={timer % 60} />
        )}
      </div>

      <div style={{ width: "100%", marginTop: "0.37rem" }}>
        {timer > 0 && chkNum.length === 6 ? (
          isCheck ? (
            <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>
              인증이 완료되었습니다.
            </LoginChkAlrm>
          ) : (
            <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
              인증번호가 일치하지 않습니다.
            </LoginChkAlrm>
          )
        ) : timer <= 0 ? (
          <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
            인증 시간이 초과되었습니다.
          </LoginChkAlrm>
        ) : null}
      </div>
    </>
  );
}

export default UserInputNumberMessage;
