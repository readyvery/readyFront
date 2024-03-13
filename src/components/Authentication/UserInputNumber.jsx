import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RedButton from "./RedButton";
import "./UserInputNumber.css";
import UserInputNumberMessage from "./UserInputNumberMessage";

//TODO: 훅 분리
function PhoneCertificationInput({ id, type, placeholder, requiredname, text, buttonText }) {
  const [inputNum, setInputNum] = useState(false);
  const [chkButton, setChkButton] = useState(false); // 인증버튼 클릭 여부
  const [Phonenumber, setPhonenumber] = useState(''); // 전화번호 상태
  const navigate = useNavigate();
  const apiRoot = process.env.REACT_APP_API_ROOT;
  const apiVer = "api/v1";
  const apiUrl1 = `${apiRoot}/${apiVer}/sms/send`;
  const apiUrl2 = `${apiRoot}/${apiVer}/sms/authority`;
  const token = localStorage.getItem("accessToken");

  const handleButtonClick = () => {
    if (/^\d+$/.test(Phonenumber) && Phonenumber.length === 11) {
      setInputNum(true);
      handlePostmessage();
      // console.log("번호전송")
      // setChkButton(true);
    } else {
      setInputNum(false);
      message.info("전화번호를 올바르게 입력해주세요.");
    }
  };

  const handlePostmessage = async () => {
    try {
      setChkButton(true);
      const response = await axios.post(apiUrl1, {
        phoneNumber: Phonenumber,
      }, {headers: {
        Authorization: `Bearer ${token}`,
      }})
      console.log(response);

      if (response.data.success) {
        console.log("인증번호 발송 성공:", response.data);
      } else {
        console.log("인증번호 발송 실패:", response.data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const renderUserInputNumberMessage = () => {
    if (type === "tel" && chkButton && inputNum) {
      return <UserInputNumberMessage phoneNumber={Phonenumber}/>;
    }
    return null;
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
  }

  const handleRegisterClick = async () => {
    try {
      const response = await axios.post(apiUrl2, {
        phoneNumber: Phonenumber,
      }, {headers: {
        Authorization: `Bearer ${token}`,
      }})
      console.log(response);

      if (response.data.success) {
        console.log("전화번호 등록 성공");
        navigate('/');
      } else {
        console.log("전화번호 등록 실패", response.data);
        message.info("전화번호 등록에 실패하셨습니다.");
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="user-input-phone-number-wrapper">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          requiredname={requiredname}
          value={Phonenumber}
          onChange={handlePhoneChange}
          className="user-input-phone-number-input"
        />
        <button
          type="submit"
          onClick={handleButtonClick}
          className={`user-input-phone-number-button ${chkButton ? "user-input-phone-number-button-clicked" : ""}`}
        >
          {text === "인증" ? (chkButton ? "재인증" : text) : "조회"}
        </button>
      </div>
      {renderUserInputNumberMessage()}
      <div className="user-input-phone-number-auth-button">
        <RedButton type="submit" onClick={handleRegisterClick}>{buttonText}</RedButton>
      </div>
    </>
  );
}


const UserInputNumber = () => {

    return(
        <div className="user-input-phone-number-content-number-wrapper">
            <PhoneCertificationInput 
                id="userid" 
                type="tel"
                placeholder="전화번호"
                requiredname="username"
                text="인증"
                buttonText="완료"
            />
        </div>
    )
}
export default UserInputNumber;