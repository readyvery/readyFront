import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RedButton from "./RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage";

const TIMER_DURATION = 180; //타이머 시간 설정(3분)


const UserInputNumber = () => {
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(""); // 전화번호 상태
  const [verifyState, setVerifyState] = useState(false); //전화번호 인증 상태
  const [postmessage, setPostmessage] = useState(false); // 인증 번호 발송 성공 여부
  const navigate = useNavigate();
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl1 = `${apiRoot}/${apiVer}/sms/send`;
  const apiUrl2 = `${apiRoot}/${apiVer}/sms/authority`;
  const token = localStorage.getItem("accessToken");

  const handleButtonClick = () => {
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      if (!postmessage) {
        handlePostmessage();
      } else {
        setPostmessage(false);
        handlePostmessage();
      }
    } else {
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePostmessage = async () => {
    try {
      setChkButton(true);
      const response = await axios.post(
        apiUrl1,
        {
          phoneNumber: Phonenumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        message.success("인증번호를 발송했습니다.");
        setPostmessage(true);
      } else {
        message.error("인증번호를 발송에 실패했습니다.");
        setPostmessage(false);
      }
    } catch (error) {
      console.error(error);
      message.error("인증번호를 발송에 실패했습니다.");
      setPostmessage(false);
    }
  };

  // 주석 풀기
  const renderUserInputNumberMessage = () => {
    if (postmessage) {
      return (
        <UserInputNumberMessage
          phoneNumber={Phonenumber}
          initialTimer={TIMER_DURATION}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  };
  // 번호 인증 성공 여부 확인
  const handleAuthSuccess = (success) => {
    setVerifyState(success);
  };

  const handleRegisterClick = async () => {
    if (verifyState) {
      try {
        const response = await axios.post(
          apiUrl2,
          {
            phoneNumber: Phonenumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.data.success) {
          message.success("전화번호 등록 성공했습니다.");
          navigate("/");
        } else {
          console.log("전화번호 등록 실패", response.data);
          message.info("전화번호 등록에 실패하셨습니다.");
        }
      } catch (error) {
        console.error(error);
        message.info("전화번호 등록에 실패하셨습니다.");
      }
    } else {
      message.info("전화번호 인증부터 진행해주세요.");
    }
  };

  return (
    <div className="user-input-phone-number-content-number-wrapper">
      <div className="user-input-phone-number-wrapper">
        <input
          type="tel"
          placeholder="전화번호"
          value={Phonenumber}
          onChange={handlePhoneChange}
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
      {renderUserInputNumberMessage()}
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
