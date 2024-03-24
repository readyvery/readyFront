import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginChkAlrm from "./LoginChkAlrm";
import "./UserInputNumberMessage.css";
const Timer = ({ minutes, seconds }) => (
  <div className="timer">
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
);
function useTimer(initialSeconds) {
  const [timer, setTimer] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);
  return { timer };
}
function UserInputNumberMessage({ phoneNumber, onAuthSuccess, initialTimer }) {
  const token = localStorage.getItem("accessToken");
  const [chkNum, setChkNum] = useState("");
  const [isAuth, setIsAuth] = useState();
  const apiUrl = process.env.REACT_APP_API_ROOT;
  const { timer } = useTimer(initialTimer);
  const handleInputText = async (e) => {
    const newChkNum = e.target.value;
    setChkNum(newChkNum);
    // equlChknum(newChkNum, AUTH_CODE);
    if (newChkNum.length === 6) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/v1/sms/verify`,
          {
            phoneNumber: phoneNumber,
            verifyNumber: newChkNum,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          onAuthSuccess(true);
          setIsAuth(true);
        } else {
          onAuthSuccess(false);
          setIsAuth(false);
        }
      } catch (error) {
        console.log("통신에러", error);
      }
    } else {
      onAuthSuccess(false);
      setIsAuth(false);
    }
  };

  const renderMessage = () => {
    if (timer <= 0) {
      return (
        <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
          인증 시간이 초과되었습니다.
        </LoginChkAlrm>
      );
    } else if (timer > 0 && !isAuth) {
      return (
        <LoginChkAlrm icon={"X"} paddingSize={"0.45rem"}>
          인증번호가 일치하지 않습니다.
        </LoginChkAlrm>
      );
    } else if (timer > 0 && isAuth) {
      return (
        <LoginChkAlrm icon={""} paddingSize={"0.45rem"}>
          인증이 완료되었습니다.
        </LoginChkAlrm>
      );
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
          autocomplete="off" //자동완성 없애기
          onChange={handleInputText}
          maxLength="6"
          // readOnly={isAuth}
        />
        {timer > 0 && (
        <Timer minutes={Math.floor(timer / 60)} seconds={timer % 60} />
        )}
      </div>
      <div style={{ width: "100%", marginTop: "0.37rem" }}>
        {renderMessage()}
      </div>
    </>
  );
}

export default UserInputNumberMessage;
